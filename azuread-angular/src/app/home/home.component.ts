import { Component, OnInit } from '@angular/core';
import { AzureAdService } from '../azure-ad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isUserLoggedIn:boolean=false
  constructor( private azureAdService:AzureAdService){}

  ngOnInit():void{
    this.azureAdService.isUserLoggedIn.subscribe(
      x=>{
        this.isUserLoggedIn=x;
      }
    )
  }

}
