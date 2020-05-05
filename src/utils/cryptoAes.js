import CryptoJS from 'crypto-js'
/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */
export const encrypt = (data) => { //加密
  var key  = '0880076B18D7EE81';  //密钥
  var iv   = 'CB3EC842D7C69578';  //十六位十六进制数作为密钥偏移量
  var encrypted =getAesString(data,key,iv); //密文
  var encrypted1 =CryptoJS.enc.Utf8.parse(encrypted);
  return encrypted;
}

      function getAesString(data,key,iv){//加密
  var key  = CryptoJS.enc.Utf8.parse(key);
  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var encrypted =CryptoJS.AES.encrypt(data,key,
      {
          iv:iv,
          mode:CryptoJS.mode.CBC,
          padding:CryptoJS.pad.Pkcs7
      });
  return encrypted.toString();    //返回的是base64格式的密文
}
/**
 * 解密
 */
export const decrypt = (data) => {//解密
  var key  = '0880076B18D7EE81';  //密钥
  var iv   = 'CB3EC842D7C69578';  //十六位十六进制数作为密钥偏移量
  var decryptedStr =getDAesString(data,key,iv);
  return decryptedStr;
}

      function getDAesString(encrypted,key,iv){//解密
  var key  = CryptoJS.enc.Utf8.parse(key);
  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var decrypted =CryptoJS.AES.decrypt(encrypted,key,
      {
          iv:iv,
          mode:CryptoJS.mode.CBC,
          padding:CryptoJS.pad.Pkcs7
      });
  return decrypted.toString(CryptoJS.enc.Utf8);     
}