const AWS = require("aws-sdk");
const config = require("../config/config");
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("../utils/statusCode")

AWS.config.update({
    accessKeyId : config.aws.accessKeyId,
    secretAccessKey : config.aws.secretAccessKey,
    region : config.aws.region
});


class Bucket{

    #req;
    #res;
    #validationExecuted;
    #files;
    #inputName;

    constructor(req,res){

        this.#req = req;
        this.#res = res;
        this.#validationExecuted = false;
        this.#files=[];
        this.#inputName="";
    }

    fileValidator(inputName,arr,limit=""){

        this.#inputName = inputName;

        if(!this.#req.files){

            this.#validationExecuted = true;
            return { validated:true, message:`success`, length:0  };
        }

        const has = inputName in this.#req.files;
        if(!has){
            this.#validationExecuted = true;
            return { validated:true, message:`success`, length:0  };
        }

        const ilength = this.#req.files[ inputName ].length;

        if(limit != "" && ilength>limit){
            return { validated:false, message:`Only ${limit} ${inputName} can be selected` };
        }

        if(ilength == undefined){
    
            this.#files.push( this.#req.files[ inputName ] );
        }
        
        if( ilength > 0){

            for(var i=0; i<ilength; i++){

                this.#files.push(this.#req.files[ inputName ][i] );
            }
        }

        for(var i=0; i<this.#files.length; i++){

            var name = this.#files[i].name;
            var ext = name.split(".");
            ext = ext[ ext.length - 1 ].toLowerCase();

            if(arr.indexOf(ext) === -1){
                return { validated:false, message:`file type not allowed for ${inputName}` };
            }

        }


        this.#files = this.#files.length;

        this.#validationExecuted = true;
        return { validated:true, message:`success`, length:this.#files  };

    }

    async upload(startingName, func){

        if(!this.#validationExecuted){
            return this.#res.status(BAD_REQUEST).json("Run fileValidator before uploading to bucket");
        }

        if(this.#files < 1){
            return func([]);
        }

        try{
    
            const rawfiles = this.#req.files[this.#inputName];
            const ilength = rawfiles.length;
        
            const s3 = new AWS.S3();
            const files = [];
            const promises=[];

            if(ilength == undefined){
    
                files.push(Buffer.from(rawfiles.data, 'binary'));
            }
            else{
    
                await rawfiles.forEach(element => {
                
                    files.push(Buffer.from(element.data, 'binary'))
                });
            }        
    
            
            files.forEach(element=>{
    
                 var p = new Promise((resolve,reject)=>{

                    const params = {
                        Bucket : config.aws.bucket,
                        Key :`${startingName}_${Math.random().toString()}`,
                        Body : element
                    }

                      s3.upload(params,(err, data)=>{
                        if(err){
                          
                            reject(err)
                        }

                        resolve(data);

                    })

                    })

                    promises.push(p);
              
            })

            Promise.all(promises).then(result=>{
                
                const x = result.map(elem=>{
                    return elem['Key'];
                })

                return func(x);
                
            }).catch(err=>{

                return this.#res.status(BAD_REQUEST).json("error uploading to bucket 1");
            })

        }
        catch(err){
            return this.#res.status(INTERNAL_SERVER_ERROR).json("Error uploading to bucket 2");
        }
    }

    async uploadBuffer(data,key,func){

        const s3 = new AWS.S3();
        const params = {
            Bucket : config.aws.bucket,
            Key :key,
            Body : data
        }

        s3.upload(params,(err, data)=>{
            if(err){
              return func(false)
                
            }

            return func(true);

        })


    }

    getFileStream(fileKey){

        // const downParam = {
        //     Key : fileKey,
        //     Bucket : config.aws.bucket
        // }

        // const s3 = new AWS.S3();

        // s3.getObject(downParam, function(err, data) {
        //     return data ? data.createReadStream() : null;
        // });
        
        
        // try{
        //     return s3.getObject(downParam).createReadStream();
        // }
        // catch(e){
        //     return null;
        // }

    }

    getRawFile(fileKey,func){

        const downParam = {
            Key : fileKey,
            Bucket : config.aws.bucket
        }

        const s3 = new AWS.S3();

        s3.getObject(downParam, function(err, data) {
            return func(data ? data.Body : null);
        });

    }

    deleteFile(fileKey){

        const downParam = {
            Key : fileKey,
            Bucket : config.aws.bucket
        }

        const s3 = new AWS.S3();

        s3.deleteObject(downParam);
    }

    async uploadImageUri(dataArray,startingName,func){

        const s3 = new AWS.S3();
        const promises = [];
        const files=[];

        await dataArray.forEach(element=>{

            const base64Data = Buffer.from(element, 'base64');
            const type = element.split(';')[0].split('/')[1];

            files.push({data:base64Data, type:type});

        });



        files.forEach(element=>{
    
            var p = new Promise((resolve,reject)=>{

               const params = {
                   Bucket : config.aws.bucket,
                   Key :`${startingName}_${Math.random().toString()}`,
                   Body : element.data
               }
                 s3.upload(params,(err, data)=>{
                   if(err){
                       reject("error uploading")
                   }

                   resolve(data);
               })

               })

            promises.push(p);
        });

        Promise.all(promises).then(result=>{

            return func(result);
            
        }).catch(err=>{


            return this.#res.status(BAD_REQUEST).json("Error uploading to bucket");
        })

    }

}


module.exports = Bucket;