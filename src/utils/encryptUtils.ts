import Cryptr from 'cryptr';
import bcrypt from "bcrypt";

const cryptr = new Cryptr("top_secret");

function encrypt(password: string) {
  return cryptr.encrypt(password);
}

function decrypt(encryptedPassword: string) {
  return cryptr.decrypt(encryptedPassword);
}

export const cryptographyUtil = {
  encrypt,
  decrypt,
};

export interface EncryptInterface { 
  encryptData: (data: string) => string;
  decryptData: (data: string) => string;
  hashDataBcrypt: (data: string) => string;
  validateBcryptData: (data: string, hashData: string) => boolean;
}

export const encryptUtils : EncryptInterface = { 
  encryptData : (data) => {
      return cryptr.encrypt(data);
  },
  decryptData : (data) => {
      return cryptr.decrypt(data);
  },
  hashDataBcrypt: (data) => {
      return bcrypt.hashSync(data, 10);
  },
  validateBcryptData: (data, hashData) =>{
      return bcrypt.compareSync(data, hashData);
  }
}