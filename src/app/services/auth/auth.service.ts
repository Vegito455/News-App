import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { EncryptDecryptService } from '../../shared/ecrypt-decrypt/encrypt-decrypt.service';
import { User } from '../../shared/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user: User | any = null;
  loginFlag: boolean;



  constructor(private fireAuth: AngularFireAuth, private router: Router, private encdecService: EncryptDecryptService) {
    this.fireAuth.authState.subscribe((user) => {
      if (user != null || user != undefined) {
        this.user = user.providerData[0];
      }
      else {
        this.user=user;
      }
      console.log('this.user--->', this.user);
    });
  }



  async loginWithGoogle() {
    await this.fireAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        console.log('Login Successfully...!!!', res.user.providerData[0]);
        console.log("encrypted res", this.encdecService.encryptJson(res.user.providerData[0]));

        localStorage.setItem('data', this.encdecService.encryptJson(res.user.providerData[0]));

      })
      .catch((error) => {
        console.log('Error while sign in', error);
      });

    return this.CheckIfUserAlreadyLogin();
  }

  SignOut() {
    return this.fireAuth.signOut().then(() => {
      console.log('SignOut Successfully...!!!');
      this.CheckIfUserAlreadyLogin();
      localStorage.clear();
      this.router.navigate(['/']);
    });

  }

  async CheckIfUserAlreadyLogin() {
    await this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user.providerData[0];
        console.log('User is signed in', this.user);
        this.loginFlag = true;
        return this.loginFlag;
      } else {
        this.user = user;
        console.log('No user is signed in', this.user);
        this.loginFlag = false;
        return this.loginFlag;
      }
    });

  }

  
  CheckUserLoginFlag() {
    this.loginFlag = (localStorage.getItem('data') != null || localStorage.getItem('data') != undefined) ? true : false;
    console.log('loginFlag', this.loginFlag);
    return this.loginFlag;
}


}
