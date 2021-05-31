import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TopHeadlineService } from 'src/app/services/topheadline/topheadline.service';
import * as _ from 'lodash';
import { Observable, Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/ecrypt-decrypt/encrypt-decrypt.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topheadline',
  templateUrl: './topheadline.component.html',
  styleUrls: ['./topheadline.component.css'],
})
export class TopHeadlineComponent implements OnInit, OnDestroy {

  allTopHeading: any = [];
  searchText: any = "";
  p: number = 1;
  paginationConfig: any;

  subscription: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 60000); //repeat after every 1 min 
  loginFlag: boolean = false;
  tempallTopHeading: any[];
  exploredKeyword: any;
  exploredKeywordJson: any;
  exploredKeywordItem: any;


  constructor(private authService: AuthService, private topheadlinesService: TopHeadlineService,
    private router: Router, private encdecService: EncryptDecryptService, private toastr: ToastrService) { }

  ngOnInit() {

    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.getSearchData();
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getTopHeadlines() {


    await this.topheadlinesService.getTopHeadlines().subscribe((res: any) => {
      console.log("getTopHeadlines res--->", res);

      if (res != null && res.articles != null) {
        this.allTopHeading = res.articles;
        /*  this.tempallTopHeading = [...this.allTopHeading]; //using this tempallTopHeading data in search filter */

        console.log("allTopHeading--->", this.allTopHeading, "count--->", this.allTopHeading.length);
      }
    })

    this.setPaginationConfig();

  }

  setPaginationConfig() {
    this.paginationConfig = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.allTopHeading.length
    };
  }


  getSearchData() {
    if (this.searchText == "") {
      this.getTopHeadlines();
      console.log("search if block--->", this.allTopHeading.length)
    } else {


      this.topheadlinesService.getSearchedRecord(this.searchText).subscribe((res: any) => {
        console.log("search res--->", res);

        if (res != null && res.articles != null) {
          this.allTopHeading = res.articles;
          console.log("allTopHeading--searched->", this.allTopHeading, "count--->", this.allTopHeading.length);
        }


      })
      // this.allTopHeading = this.allTopHeading.filter((val) => val.title.toLowerCase().includes(this.searchText));
      console.log("search else block--->", this.allTopHeading.length)


    }

    this.setPaginationConfig();

  }


  pageChanged(event) {
    this.paginationConfig.currentPage = event;
    window.scroll(0, 0);
  }

  viewFullArticle(url: string) {
    window.open(`${url}`, "_blank");
  }


  saveKeyword() {
    this.exploredKeywordItem = [];
    this.loginFlag = this.authService.CheckUserLoginFlag();
    console.log("loginFlag--->", this.loginFlag);

    if (this.loginFlag) { //checking if user logged in or not

      if(this.searchText!=""){

      console.log('exploreKeywords---->', localStorage.getItem('exploreKeywords'));

      this.exploredKeywordJson = (localStorage.getItem('exploreKeywords') != null) ? this.encdecService.decryptJson(localStorage.getItem('exploreKeywords')) : localStorage.getItem('exploreKeywords');

      console.log('this.exploredKeywordJson---->', this.exploredKeywordJson);

      if ((localStorage.getItem('exploreKeywords') != null) || (this.exploredKeywordJson != null)) {

        if (((this.exploredKeywordJson.Array != undefined)) || (this.exploredKeywordJson.Array != null)) {

          this.exploredKeywordItem = this.exploredKeywordJson.Array;
          console.log("this.exploredKeywordItem before--->", this.exploredKeywordItem);

          // this.exploredKeywordItem = [...this.exploredKeywordItem, { "keyword": this.searchText, "id": this.exploredKeywordItem.length + 1 }];
          this.exploredKeywordItem = [...this.exploredKeywordItem, { "keyword": this.searchText }];
          // this.exploredKeywordItem = _.uniq(this.exploredKeywordItem);

          this.exploredKeywordItem = _.uniqWith(this.exploredKeywordItem, _.isEqual);

          console.log("this.exploredKeywordItem after--->", this.exploredKeywordItem);
        }
      }
      else {
        this.exploredKeywordItem = [
          {
            "keyword": this.searchText,
            // "id": 1
          }
        ];
      }

      this.exploredKeywordJson = {
        Array: this.exploredKeywordItem
      };
      console.log('exploredKeywordJson--->', this.exploredKeywordJson);

      localStorage.setItem('exploreKeywords', this.encdecService.encryptJson(this.exploredKeywordJson));


    }

    } else {

      console.log("saveKeyword--else->", this.loginFlag);
      this.showInfo();
      /* this.authService.loginWithGoogle();
      this.router.navigate(['/home']); */

    }


  }

  showInfo() {
    this.toastr.info('Please Login', 'Info', {
      timeOut: 3000, positionClass: 'toast-top-center', progressBar: true, progressAnimation: 'increasing'
    });
  }

}
