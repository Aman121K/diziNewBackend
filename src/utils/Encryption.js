//Checking the crypto module
const crypto = require('crypto');
const { login, id } = require('../config/keys')

class Encryption
{
    #algorithm;
    #key = login.key;
    #iv = login.iv;
    #myKey;
    #myIv;

    constructor()
    {
        this.#algorithm = 'aes-256-cbc'; //Using AES encryption

    }

    setKeyIv(key,iv)
    {
        this.#myKey = key;
        this.#myIv = iv;
    }

    generateKeyIv()
    {
        this.#myKey = crypto.randomBytes(32).toString('hex');
        this.#myIv = crypto.randomBytes(16).toString('hex');

        return({ key : this.#myKey, iv : this.#myIv })
    }

    hide(text)
    {
        try {
            let cipher = crypto.createCipheriv(this.#algorithm, this.#key, this.#iv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString('hex');
            
         } catch (error) {
      
            return undefined;
         }
    }

    show(text)
    {
        try {
            let encryptedText = Buffer.from(text, 'hex');
      
            let decipher = crypto.createDecipheriv(this.#algorithm, this.#key, this.#iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
            
         } catch (error) {
            
            return undefined;
         }

    }

    encrypt(text)
    {
        if(!this.#myKey || !this.#myIv)
        return;

        var lockey = Buffer.from(this.#myKey, 'hex');
        var lociv = Buffer.from(this.#myIv, 'hex');

        try {
            let cipher = crypto.createCipheriv(this.#algorithm, lockey, lociv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString('hex');
            
         } catch (error) {
      
            return undefined;
         }

    }

    decrypt(text)
    {
        if(!this.#myKey || !this.#myIv)
        return;

        try {
            let iv = Buffer.from(this.#myIv, 'hex');
            let key = Buffer.from(this.#myKey, 'hex');
            let encryptedText = Buffer.from(text, 'hex');
      
            let decipher = crypto.createDecipheriv(this.#algorithm, key, iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
            
         } catch (error) {
            
            return undefined;
         }
    }

}


module.exports = Encryption;