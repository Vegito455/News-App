import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  apiKey="8d32e11d70754cbda8433c8a377babe9";

  constructor(private http: HttpClient) {
 
  }



  getListingData(data) {

    

    console.log("data-->", data)
    let params = new HttpParams();
    params = params.set("q", data);
    params = params.set("apiKey", this.apiKey);

    return this.http.get(`http://newsapi.org/v2/everything`, { params });
  }

}


