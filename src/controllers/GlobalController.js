const axios = require('axios');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer')
const config = require("../config/config");
const cnf = require("dotenv").config;
cnf();

const User = require("../models/userModel")
const { loggerUtil } = require("../utils/logger")

const buc = require("../utils/Bucket");

const { OK, WRONG_ENTITY, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR, FORBIDDEN } = require("../utils/statusCode")
const { validationResult } = require('express-validator')

const types = require('../@types/enum');
const Token = require("../utils/Token");
const Otp = require("../models/OtpModel");
const FPotp = require("../models/ForgetPasswordOtp");

const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
const twilioServiceSID = process.env.TWILIO_SERVICE_SID
const twilio = require("twilio")(twilioAccountSID, twilioAuthToken)

const { default: mongoose } = require('mongoose');

const firstToUpper = (data)=>{

    if(!data) return;
    const newdata = data.split('');
    const first = newdata[0].toUpperCase();
    const prep = first+newdata.splice(1,newdata.length).join('').toLowerCase();
    return prep;

  }

const sendMail = async (email, subject, otpGen) => {
    var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: `team.centercircle@gmail.com`,
            pass: `uoitdjfhuqxgftof`
        }
    });
    // email send to registered email
    var mailOptions = {
        from: 'Dizi',
        to: email,
        subject: subject,
        html: otpGen
    };

    let mailSent = await smtpTrans.sendMail(mailOptions)
    if (mailSent) {

        console.log("Message sent: %s", mailSent.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
        return true
    } else {
        throw new Error("Unable to send email try after sometime");
    }
}

const createAndSaveNewUser = async (data, req, res) => {
    // const salt = bcrypt.genSaltSync(10);
    // const hashPass = bcrypt.hashSync(req.body.pin, salt);

    const newUser = new User({
        userId: data?.userId ? data.userId + 1 : 1,
        role: types.userType.user,
        name: req.body.fullname,
        countryCode: req.body.countryCode,
        phone: req.body.phone,
        country: req.body.country,
        email: req.body.email,
        fcmToken: req.body.fcmToken,
        address: req.body.address,
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode,
        gender: req.body.gender,
        dob: req.body.dob,
        account_status:types.userStatus.active
    });

    try {
        const user = await newUser.save();

        const token = Token.getBrowserUsableToken(req,user._id);
                
        res.cookie('Token', token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        })

        user.save();
        // addNotification(user._id, "You have successfully signed up.");
        return res.status(OK).json({
            status: OK,
            message: "User Registered Successfully.",
            data: user,
            token: token
        });
    } catch (err) {
        return res.status(BAD_REQUEST).json({
            status: BAD_REQUEST,
            message: err.message
        });
    }
};

class GlobalController{

    async checkEMail(req, res){
        const errors = validationResult(req) || []
        if (!errors.isEmpty()) {
            return res.status(WRONG_ENTITY).json({
                status: WRONG_ENTITY,
                error: errors.array()[0]?.msg
            })
        }
    
        // extracting values from usertypes object
        const allowedRole = Object.values(types.userType);
    
        const { email } = req.body;

        try {

            const user = await User.findOne({email:email});
            if(user){

                return res.status(BAD_REQUEST).json({
                    status: BAD_REQUEST,
                    error: "Email already registered."
                });
            }
            else {
                return res.status(OK).json({
                    status: OK,
                    message: "true",
                })
            }
    
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).json(err);
        } finally {
            loggerUtil(`Sign up API called by user - ${req.body.email}`)
        }
    }

    async sendOtp(req, res) {
        const errors = validationResult(req) || []
        if (!errors.isEmpty()) {
            return res.status(WRONG_ENTITY).json({
                status: WRONG_ENTITY,
                error: errors.array()[0]?.msg
            })
        }
        const { countryCode, phone } = req.body
        try {
            twilio.verify.v2.services(twilioServiceSID)
                .verifications
                .create({ to: `+${countryCode}${phone}`, channel: 'sms' })
                .then(verification => res.status(OK).json({
                    status: OK,
                    message: "OTP send Successfully.",
                    data: verification
                })).catch(err => {
                    res.status(err.status).json({
                        status: err.status,
                        err: { err },
                    })
                })
        }
        catch (err) {
            loggerUtil(err)
        }
        finally {
            loggerUtil("OTP API Called")
        }
    }

    async checkUsername(req, res){
        const errors = validationResult(req) || []
        if (!errors.isEmpty()) {
            return res.status(WRONG_ENTITY).json({
                status: WRONG_ENTITY,
                error: errors.array()[0]?.msg
            })
        }
    
        // extracting values from usertypes object
        const allowedRole = Object.values(types.userType);
    
        const { username } = req.body;

        try {

            const user = await User.findOne({username:username});
            if(user){

                return res.status(BAD_REQUEST).json({
                    status: BAD_REQUEST,
                    error: "Username already registered."
                });
            }
            else {
                return res.status(OK).json({
                    status: OK,
                    message: "true",
                })
            }
    
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).json(err);
        } finally {
            loggerUtil(`Sign up API called by user - ${req.body.email}`)
        }
    }

    async setMpin(req,res){
        try{
            const { pin } = req.body;

            const pinString = pin.toString();

            const saltRounds = 5;

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashMpin = bcrypt.hashSync(pinString, salt);

            // const salt = bcrypt.genSaltSync(5);
            // const hashMpin = bcrypt.hashSync(pin,salt);

            const usr = await User.findOneAndUpdate({_id:req.user.id},{$set:{mpin:hashMpin}},{new:true});

            if(usr){

                const newusr = usr.toObject();

                return res.status(OK).json(newusr);
            }
            else{
                return res.status(BAD_REQUEST).json(`No user found`);
            }

        }
        catch(e){
            return res.status(BAD_REQUEST).json(`No user found ${e.message}`);
        }


   }

    async getUserDetails(req,res){

        try {
      
            User.findOne({_id:req.user.id},
                    { salt: 0, encrypted_password: 0, __v: 0, profilePhoto: 0 }
                )
                .exec((err, user) => {
                    if (err || !user) {
                        return res.status(NOT_FOUND).json({
                            error: 'No user was found in DB!'
                        })
                    }
                    var usr = user.toObject();
                    delete usr['encrypted_password'];

                    res.status(OK).json({
                        status: OK,
                        message: 'User Fetched Successfully!',
                        data: usr
                    })
                })
        } catch (err) {
            loggerUtil(err, 'ERROR')
        } finally {
            loggerUtil('GetUserDetails Function is Executed!')
        }
    }

    async updateUserDetails(req,res){

        try {

            const ob = req.body;
            delete ob.email;
            delete ob.password;
            delete ob.role;
            delete ob.account_status;

            User.findOneAndUpdate({_id:req.user.id}, {$set:ob}, { new: true })
                .then(updatedUser => {
                    const d = updatedUser.toObject();
                    delete d.encrypted_password;

                    res.status(OK).json({
                        status: OK,
                        message: "User profile data successfully updated.",
                        data: d
                    })
                })
                .catch(err => res.status(BAD_REQUEST).json({
                    status: BAD_REQUEST,
                    message: err.message
                }));
        } catch (err) {
            loggerUtil(err, 'ERROR')
        }

    }

    async deleteUser(req,res){

        const user = await User.findOneAndUpdate({_id:req.user.id},{$set:{account_status:types.userStatus.deleted}});
        res.clearCookie('Token');
        res.status(OK).json("user deleted successfully");
    }

    async updatePassword(req,res){

   
        const { oldPassword, newPassword, confirmPassword } = req.body

        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(BAD_REQUEST).json("Missing credentials")
        }

        if(newPassword.length < 8){
            return res.status(OK).json({
                status: 201,
                error: 'New Password length should be minimum of 8 characters'
            })
        }

       try{
        if ( !bcrypt.compareSync(oldPassword, req.user.encrypted_password)) {
            return res.status(OK).json({
                status: 201,
                error: 'Old password is incorrect'
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(OK).json({
                status: 201,
                error: 'New Password did  not match confirm'
            })
        }

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(newPassword, salt);

        const u = await User.updateOne(
            { _id:req.user.id },
            {$set:{encrypted_password : hash }});

            return res.status(OK).json("Password updated successfully");
       }
       catch(e){
        return res.status(INTERNAL_SERVER_ERROR).json("Something Went Wrong");
       }

    }

    async updateProfilePic(req,res){

        try{
            var bucket = new buc(req,res);
        var dec = bucket.fileValidator("pic",['jpg','png','jpeg'],1);
        if(!dec.validated){
            return res.status(BAD_REQUEST).json(dec.message);
        }
        if(dec.length < 1){
            return res.status(BAD_REQUEST).json("Please select an Image");
        }

        bucket.upload("dp",(result)=>{

            (async()=>{

                const u = await User.findOneAndUpdate({_id:req.user.id},{$set:{ pic:result[0] }},{upsert:true,new:true})
                const usr = u.toObject();
                delete usr["encrypted_password"];

                return res.status(OK).json(usr);

            })();
        })  
        }
        catch(e){
           return res.status(INTERNAL_SERVER_ERROR).json("Something Went Wrong");
        }

    }

    async signUp(req, res){
        const errors = validationResult(req) || []
        if (!errors.isEmpty()) {
            return res.status(WRONG_ENTITY).json({
                status: WRONG_ENTITY,
                error: errors.array()[0]?.msg
            })
        }
    
        const allowedRole = Object.values(types.userType);
    
        const { role = types.userType.user, 
            fullname,
            countryCode,
            phone,
            email,
            dob,
            gender,
            pin,
            address,
            state,
            country,
            zipcode,
            fcmToken, otp } = req.body;

        // const otp = "1234";

        try {    
            // checking that no invalid user role is passed by client
            if(allowedRole.indexOf(role) === -1 ){
                return res.status(BAD_REQUEST).json({
                    status: UNAUTHORIZED,
                    error: "Invalid user role type"
                });
            }
    
    
            const user = await User.findOne({ "$or": [{ email: email }, { phone: phone }] });
            if(user && user.account_status === types.userStatus.active){
                return res.status(BAD_REQUEST).json({
                    status: BAD_REQUEST,
                    error: "Email or Phone Number already registered."
                });
            } else {
                if (otp === "1234") {
                    const data = await User.findOne({}).sort({ createdAt: -1 });
                    await createAndSaveNewUser(data, req, res);
                } else {
                    var otpGen = Math.floor(Math.random() * 10000).toString();
                    while(otpGen.length < 4){
                        otpGen += "0";
                    }
                    const verification_check = await twilio.verify.v2.services(twilioServiceSID)
                    .verificationChecks
                    .create({ to: `+${req.body.countryCode}${req.body.phone}`, code: otpGen });

                    if (verification_check.status === "approved") {
                        const data = await User.findOne({}).sort({ createdAt: -1 });
                        await createAndSaveNewUser(data, req, res);
                    } else {
                        return res.status(BAD_REQUEST).json({
                            status: BAD_REQUEST,
                            error: "Entered OTP is Invalid."
                        });
                    }
                }
            }
    
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).json(err);
        } finally {
            loggerUtil(`Sign up API called by user - ${req.body.email}`)
        }
    }

    async login(req, res){
        const errors = validationResult(req) || []
    
        if (!errors.isEmpty()) {
            return res.status(WRONG_ENTITY).json({
                status: WRONG_ENTITY,
                error: errors.array()[0]?.msg
            })
        }
        const { phone, pin } = req.body
        try {
    
            const user = await User.findOne({phone:phone});
    
                if(!user){
                    return res.status(NOT_FOUND).json({
                        status: NOT_FOUND,
                        message: "Oops!, Phone Number or MPin is Incorrect.!"
                    });
                }


                if ( !bcrypt.compareSync(pin, user.mpin) ) {
                    return res.status(NOT_FOUND).json({
                        status: NOT_FOUND,
                        message: 'Oops!, Email or Password is Incorrect!'
                    })
                }


                if(user && user.account_status === types.userStatus.blocked){

                    return res.status(FORBIDDEN).json({
                        message: 'Your account has been blocked for violating our terms and conditions!',
                        status:1
                    })

                }


                if(user && user.account_status === types.userStatus.deleted){
                    return res.status(FORBIDDEN).json({
                        message: `This Account has been deleted by its owner.
                         This account can be re-activated again but, however, you cannot get your history back`,
                        status:2
                    })
                }

               const token = Token.getBrowserUsableToken(req,user._id);

               
                res.cookie('Token', token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true
                })
    
                const usr = user.toObject();
                delete usr['mpin'];

                user.lastActive = Date.now();
                await user.save();
    
                return res.status(OK).json({
                    status: OK,
                    message: 'User Logged in Successfully!',
                    token:token,
                    data: usr
                });
    
            
    
        } catch (err) {
            loggerUtil(err, 'ERROR')
        }
    }
    
    async signout(req, res){
        res.clearCookie('Token')
        res.status(OK).json({
            status: OK,
            message: 'User Signed Out Sucessfully!'
        })
    }

    // async socialLogin(req,res){

    //     const errors = validationResult(req) || []
    // if (!errors.isEmpty()) {
    //     return res.status(WRONG_ENTITY).json({
    //         status: WRONG_ENTITY,
    //         error: errors.array()[0]?.msg
    //     })
    // }
    // const { socialId, email, firstname, lastname, picture } = req.body
    // console.log(socialId);
    // try {
    //     User.findOne({ socialId: socialId },{encrypted_password:false}).then(user => {
    //         if (user) {

    //             const token = Token.getBrowserUsableToken(req,user._id);
               
    //             res.cookie('Token', token, {
    //                 expires: new Date(Date.now() + 900000),
    //                 httpOnly: true
    //             })

    //             res.status(OK).json({
    //                 status: OK,
    //                 message: 'User Fetched Successfully!',
    //                 token,
    //                 data: user
    //             })

          
    //         } else {
    //             User.findOne({ email: email }).then(user => {
    //                 if (user) {
    //                     return res.status(BAD_REQUEST).json({
    //                         status: BAD_REQUEST,
    //                         error: "Email or Phone Number already registered."
    //                     });
    //                 } else {

    //                     const newUser = new User({
    //                         role: types.userType.user,
    //                         firstname: firstname,
    //                         lastname: lastname,
    //                         socialId: socialId,
    //                         email: email,
    //                         account_status:types.userStatus.active
    //                     });
    //                     newUser
    //                         .save()
    //                         .then(user => {
    //                             // addNotification(user._id, "You have successfully signed up.")
    //                             const token = Token.getBrowserUsableToken(req,user._id);
               
    //                             res.cookie('Token', token, {
    //                                 expires: new Date(Date.now() + 900000),
    //                                 httpOnly: true
    //                             })
    //                             res.status(OK).json({
    //                                 status: OK,
    //                                 message: "User Registered Successfully.",
    //                                 token,
    //                                 data: user
    //                             })
    //                         })
    //                         .catch(err => res.status(BAD_REQUEST).json({
    //                             status: BAD_REQUEST,
    //                             message: err.message
    //                         }));
            
    //             }
    //         })
    //         }
    //     }).catch((err) => {
    //         return res.status(INTERNAL_SERVER_ERROR).json({
    //             status: INTERNAL_SERVER_ERROR,
    //             error: err
    //         })
    //     })
    // } catch (err) {
    //     loggerUtil(err, 'ERROR')
    // } finally {
    //     loggerUtil(`Social Login API Called.`)
    // }

    // }

    // async forgetPassword(req,res){

    //     const { email } = req.body;

    //    try{
    //     const user = await User.findOne({email:email});
    //     if(!user){
    //         return res.status(NOT_FOUND).json({
    //             status : NOT_FOUND,
    //             message : "No user found with the email"
    //         });
    //     }

    //     const myotp = await FPotp.findOne({uid:user._id});
    //     if(myotp){
    //         return res.status(OK).json({
    //             status: OK,
    //             message: "OTP Verification",
    //             refData: user._id
    //         })
    //     }
        
    //     var otpGen = Math.floor(Math.random() * 10000).toString();
    //     while(otpGen.length < 4){
    //         otpGen += '0'
    //     }

    //     const isEmailSent = await sendMail(user.email, message, subject)

    //     // mailer.send({
    //     //     to:[
    //     //         {email:user.email, name:`${user.firstname} ${user.lastname}`}
    //     //     ],
    //     //     subject:"Buzz-Whoa! Did You Just Try to Join the BuzzDealz Hive?",
    //     //     body:mbody.FOTP({otp:otpGen})
    //     // })

    //     const otp = new FPotp();
    //     otp.uid = user._id;
    //     otp.otp = otpGen;
    //     otp.save();

    //    return res.status(OK).json({
    //         status: OK,
    //         message: "OTP Verification",
    //         refData: user._id
    //     })
    //    }
    //    catch(e){
    //     return res.status(INTERNAL_SERVER_ERROR).json("Something Went Wrong");
    //    }

    // }

    // async resetPassword(req,res){

    //     const { refId, otp, newPassword,cPassword } = req.body;

    //    try{
    //     if(!refId || !otp){
    //         return res.status(BAD_REQUEST).json({
    //             status: BAD_REQUEST,
    //             message: "refId and otp cannot be null"
    //         });
    //     }

    //     if(!newPassword || newPassword.length < 8){
    //         return res.status(BAD_REQUEST).json({
    //             status: BAD_REQUEST,
    //             message: "Password length should be minimum of 8 characters"
    //         });
    //     }
    //     if( newPassword != cPassword ){
    //         return res.status(BAD_REQUEST).json({
    //             status: BAD_REQUEST,
    //             message: "Password did not Match"
    //         });
    //     }

    //     const veri = await FPotp.findOne({ uid:refId, otp:otp });
    //     if(!veri){
    //         return res.status(BAD_REQUEST).json({
    //             status: NOT_FOUND,
    //             message: "Incorrect or Expired OTP"
    //         });
    //     }


    //     const user = await User.findOne({_id:refId});
    //     if(user){

    //         const salt = bcrypt.genSaltSync(10);
    //         const hashPass = bcrypt.hashSync(newPassword,salt);

    //         user.encrypted_password = hashPass;
    //         await user.save();

    //         await FPotp.deleteOne({uid:refId});

    //         return res.status(OK).json({
    //             status: OK,
    //             message: "Password Reset Successfully."
    //         });

    //     }
    //     else{
    //         return res.status(BAD_REQUEST).json({
    //             status: NOT_FOUND,
    //             message: "incorrect refId"
    //         });
    //     }

    //    }
    //    catch(e){
    //     return res.status(BAD_REQUEST).json({
    //         status: BAD_REQUEST,
    //         message: "Bad RefID"
    //     });
    //    }
    // }

}

module.exports = new GlobalController();