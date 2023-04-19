import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Profile } from './profile.model';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_PIC = 'https://graph.microsoft.com/v1.0/me/photo/$value';
const REPORTS_API_BASE_URI = 'https://localhost:44375/api/'
@Injectable({
  providedIn: 'root'
})
export class AzureAdService {

  isUserLoggedIn:Subject<boolean> = new Subject<boolean>();

  constructor(private httpclient:HttpClient) { }
  getUserProfile(){
    return this.httpclient.get<Profile>(GRAPH_ENDPOINT);
  }
  getProfilePic(){
    return this.httpclient.get(GRAPH_ENDPOINT_PIC,{responseType:'blob'});
  }
  getReport(){
    return this.httpclient.get(REPORTS_API_BASE_URI+ 'Report/GetReport',
      {responseType:'blob'});
  }
  getReportStatus(){
    return this.httpclient.get<any>(REPORTS_API_BASE_URI+ 'Report/GetReportStatus');
    
  }
}
