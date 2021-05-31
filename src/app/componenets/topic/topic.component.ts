import { Component, OnInit } from '@angular/core';
import { ExploreService } from 'src/app/services/explore/explore.service';
import { EncryptDecryptService } from 'src/app/shared/ecrypt-decrypt/encrypt-decrypt.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {


  searchText: any;
  p: number = 1;
  paginationConfig: any;


  selectedSource: number;

  allSourcesData: any = [];
  allListingData: any;
  tempAllListData: any;
  exploredKeywordJson: any;
  exploredKeywordItem: any;
  listingKeywordItem: any;
  selectedlistingKeyword: any[] = [];




  constructor(private exploreService: ExploreService, private encdecService: EncryptDecryptService) { }

  ngOnInit() {
    
    this.getUserExploredKeyword();
    this.getListingData();
    

  }


  getUserExploredKeyword() {

    this.selectedlistingKeyword = []

    console.log('exploreKeywords---->', localStorage.getItem('exploreKeywords'));

    this.exploredKeywordJson = (localStorage.getItem('exploreKeywords') != null) ? this.encdecService.decryptJson(localStorage.getItem('exploreKeywords')) : localStorage.getItem('exploreKeywords');

    console.log('this.exploredKeywordJson---->', this.exploredKeywordJson);

    if ((localStorage.getItem('exploreKeywords') != null) || (this.exploredKeywordJson != null)) {

      if (((this.exploredKeywordJson.Array != undefined)) || (this.exploredKeywordJson.Array != null)) {

        this.exploredKeywordItem = this.exploredKeywordJson.Array;
        this.listingKeywordItem = this.exploredKeywordJson.Array;


        /*  let tempselectedlistingKeyword = []
         
         for (let i = 0; i < this.listingKeywordItem.length; i++) {
           tempselectedlistingKeyword = [...tempselectedlistingKeyword, this.listingKeywordItem[i].keyword]
         }
         console.log("tempselectedlistingKeyword--->",tempselectedlistingKeyword);
         this.selectedlistingKeyword = tempselectedlistingKeyword;
  */
        console.log("this.exploredKeywordItem before--->", this.exploredKeywordItem, 'this.listingKeywordItem--->', this.listingKeywordItem);

        // this.exploredKeywordItem = [...this.exploredKeywordItem,{ "keyword": this.searchText , "id": this.exploredKeywordItem.length +1 }];
        // this.exploredKeywordItem = _.uniq(this.exploredKeywordItem);
        // console.log("this.exploredKeywordItem after--->", this.exploredKeywordItem);
      }
    }
    else {
      this.exploredKeywordItem = [];
    }
    this.exploredKeywordJson = {
      Array: this.exploredKeywordItem
    };

    this.listingKeywordItem = this.exploredKeywordJson.Array;
    /* this.selectedlistingKeyword =[]; */
    console.log('exploredKeywordJson--->', this.exploredKeywordJson, 'this.listingKeywordItem--->', this.listingKeywordItem);

    // localStorage.setItem('exploreKeywords', this.encdecService.encryptJson(this.exploredKeywordJson));




  }





  setPaginationConfig() {
    this.paginationConfig = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.allListingData.length
    };
  }


  async getListingData() {
    this.allListingData = [];
    console.log("getListingData fn called", this.selectedlistingKeyword);

    // this.selectedlistingKeyword = ['RNS', 'def'];

    if (this.selectedlistingKeyword.length > 0) {

      for (let i = 0; i < this.selectedlistingKeyword.length; i++) {

         this.exploreService.getListingData(this.selectedlistingKeyword[i]).subscribe((res: any) => {
          console.log("getListingData res---",i,'--->', res);

          if (res != null && res.articles != null) {
            this.tempAllListData = res.articles;

            this.allListingData = this.allListingData.concat( this.tempAllListData);
            console.log("before uniqWith allListingData--->", this.allListingData,"count---1>", this.allListingData.length)
            this.allListingData = _.uniqWith(this.allListingData, _.isEqual);

            console.log("after uniqWith allListingData--->", this.allListingData, "count---2>", this.allListingData.length);

            /* this.tempAllListData = [...this.allListingData]; //using this tempAllListData data in search filter */

            this.setPaginationConfig();
          }
        })


      }
    } else {


      await this.exploreService.getListingData(null).subscribe((res: any) => {
        console.log("getListingData res---",'--->', res);

        if (res != null && res.articles != null) {
          this.tempAllListData = res.articles;

          this.allListingData = this.tempAllListData;
          console.log("before uniq allListingData--->", this.allListingData,"count---else>", this.allListingData.length)
          // this.allListingData = _.uniq(this.allListingData);

          // console.log("after uniq allListingData--->", this.allListingData, "count---2>", this.allListingData.length);

          /* this.tempAllListData = [...this.allListingData]; //using this tempAllListData data in search filter */

          this.setPaginationConfig();
        }
      })




    }




  }


  onChange() {
    console.log("onChange fn called--->", this.selectedSource);

    this.getListingData();
  }



  pageChanged(event) {
    this.paginationConfig.currentPage = event;
    window.scroll(0, 0);
  }

  viewFullArticle(url: string) {
    window.open(`${url}`, "_blank");
  }


  getSearchData() {
    if (this.searchText == "") {
      this.getListingData();
      console.log("search if block--->", this.allListingData.length)
    } else {


      /* this.topheadlinesService.getSearchedRecord(this.searchText).subscribe((res:any)=>{
        console.log("search res--->",res);

        if (res != null && res.articles != null) {
          this.allTopHeading = res.articles;
          console.log("allTopHeading--searched->", this.allTopHeading, "count--->", this.allTopHeading.length);
        }
      }) */



      this.allListingData = this.tempAllListData.filter((val) => val.title.toLowerCase().includes(this.searchText.toLowerCase()));
      console.log("tempAllListData--->", this.tempAllListData);
      console.log("search else block--->", this.allListingData)


    }

    this.setPaginationConfig();

  }





}


