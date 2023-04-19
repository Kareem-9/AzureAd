import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureAdService } from '../azure-ad.service';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  implements OnInit{
  profile?:Profile;
  profilePic?:SafeResourceUrl;
  constructor(private azureAdService:AzureAdService,
    private domSanitizer:DomSanitizer){}

  ngOnInit(): void {
    this.getProfile();
    this.getProfilePic();
  }

  getProfile(){
    this.azureAdService.getUserProfile()
    .subscribe(profileInfo=>{
      this.profile=profileInfo;
    })
  }
  //Get the responce of blob pic and convert to Url,image needs a url and also clear brower security issues
  getProfilePic(){
    this.azureAdService.getProfilePic()
    .subscribe(response=>{
      var urlCreator = window.URL || window.webkitURL
      this.profilePic = this.domSanitizer.bypassSecurityTrustResourceUrl
      (urlCreator.createObjectURL(response));
    });
  }
}
