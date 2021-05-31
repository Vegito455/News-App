import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopHeadlineService {

  apiKey="8d32e11d70754cbda8433c8a377babe9";


  constructor(private http: HttpClient) {
    
  }

  getTopHeadlines() {

    // this.getApiKey();

    let country = "in";
    let category = "business";

    let params = new HttpParams();
    params = params.set("country", country);
    params = params.set("category", category);
    params = params.set("apiKey", this.apiKey);

    return this.http.get(`https://newsapi.org/v2/top-headlines`, { params });

  }


  getSearchedRecord(data:string){


    let params = new HttpParams();
    
    params = params.set("q", data);
    params = params.set("apiKey", this.apiKey);

    return this.http.get(`http://newsapi.org/v2/everything`, { params });

  }


}
