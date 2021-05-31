import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }

encryptJson(data:any){
console.log("encryptJSON fn--->",data)
let datastring  = JSON.stringify(data);
  return btoa(datastring);
}

decryptJson(data:any){
  console.log("decryptJson fn--->",data);
  let decryptedString = atob(data);
  console.log("decryptJson decryptedString--->",decryptedString);
  return JSON.parse(decryptedString);
}

}
