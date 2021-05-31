import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ExploreService } from 'src/app/services/explore/explore.service';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  searchText:any;
  p: number = 1;
  paginationConfig: any;


  selectedSource: number;

  allSourcesData: any = [];
  allListingData: any;
  tempAllListData: any;


  constructor(private exploreService: ExploreService) { }

  ngOnInit(): void {

    this.getAllSources();
    
  }

  async getAllSources() {


    await this.exploreService.getAllSources().subscribe((res: any) => {
      console.log("getAllSources res--->", res);

      if (res != null && res.sources != null) {
        this.allSourcesData = res.sources;
        this.selectedSource = this.allSourcesData[0];
        console.log("allSourcesData--->", this.allSourcesData, "count--->", this.allSourcesData.length);
        this.getListingData();
      }
    })
    // this.setPaginationConfig();



  }

  setPaginationConfig() {
    this.paginationConfig = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.allListingData.length
    };
  }


  getListingData() {

    console.log("getListingData fn called",this.selectedSource );

    this.exploreService.getListingData(this.selectedSource['id']).subscribe((res: any) => {
      console.log("getListingData res--->", res);

      if (res != null && res.articles != null) {
        this.allListingData = res.articles;
        console.log("allSourcesData--searched->", this.allSourcesData, "count--->", this.allSourcesData.length);

        this.tempAllListData = [...this.allListingData]; //using this tempAllListData data in search filter

        this.setPaginationConfig();
      }
    })

  }


  onChange(){
    console.log("onChange fn called--->",this.selectedSource);

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
      console.log("tempAllListData--->",this.tempAllListData);
      console.log("search else block--->", this.allListingData)


    }

    this.setPaginationConfig();

  }





}


