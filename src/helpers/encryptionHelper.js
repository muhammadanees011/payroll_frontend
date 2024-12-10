import CryptoJS from 'crypto-js';

const secretKey = '4326ssm/rhhfsdfh90?@'; // Store in a secure place

export default {
  encrypt(param) {
    if (typeof param !== 'string') {
    param = param.toString(); // Convert numbers to strings
    }

    try {
    return CryptoJS.AES.encrypt(param, secretKey).toString();
    } catch (error) {
    console.error('Encryption failed:', error);
    return null;
    }
  },

  decrypt(encryptedParam) {
    const bytes = CryptoJS.AES.decrypt(encryptedParam, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
};
