
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { EncryptDecryptService } from 'src/app/shared/ecrypt-decrypt/encrypt-decrypt.service';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData = this.authService.user;

  currentUserData: any;
  loginFlag: any=false;
  imageURL: any;
  userName: string='';

  constructor(private authService: AuthService, private encdecService: EncryptDecryptService,private router :Router, public toastr: ToastrService) { }
  ngOnInit() {

    // this.currentUserData = ;
    this.CheckCurrentUser()
    console.log("this.currentUserData--->", this.currentUserData);
    /* this.CheckIfUserAlreadyLogin(); */


  }
  /* 
    CheckIfUserAlreadyLogin() {
      console.log("CheckIfUserAlreadyLogin fn called--->");
      this.userData2 = this.authService.CheckIfUserAlreadyLogin();
      this.userData = this.authService.user;
      console.log('this.userData--->',this.userData);
      console.log('this.userData2--->',this.userData2);
      this.isLogin = (this.authService.user != null) ? true : false;
      console.log("loginFlag--->", this.isLogin);
    }
     */

  async loginWithPopUp() {
    await this.authService.loginWithGoogle();
    this.CheckCurrentUser();
    
    
    this.toastr.success('Sign-in Successfully', 'Welcome!', {
      timeOut: 3000, positionClass: 'toast-top-center', progressBar:true, progressAnimation:'increasing'
    });

    this.router.navigate(['/home']);

    
    console.log("this.currentUserData header---->", this.currentUserData);
  }

  async Signout() {
    await this.authService.SignOut();
    this.CheckCurrentUser();
    // window.location.reload();

    this.toastr.success('Sign-Out Successfully', 'Good Bye!', {
      timeOut: 3000, positionClass: 'toast-top-center', progressBar:true, progressAnimation:'increasing'
    });

    this.router.navigate(['/home']);

  }

  
   
  

  CheckCurrentUser() {

    this.loginFlag = this.authService.CheckUserLoginFlag();
    console.log('loginFlag', this.loginFlag);

    if (this.loginFlag) {
      this.currentUserData = this.encdecService.decryptJson(localStorage.getItem('data'));
      this.imageURL = this.currentUserData.photoURL;
      this.userName = this.currentUserData.displayName;
      
    }
    console.log("this.currentUserData header---->", this.currentUserData);

  }



}
