import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/assets/environments/environment';
import { AzureAdService } from './azure-ad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
  isUserLoggedIn:boolean = false;
  private readonly _destroy = new Subject<void>();
  //Few dependencies related to Azure Ad
  constructor(@Inject(MSAL_GUARD_CONFIG) private maslGuardConfig:MsalGuardConfiguration,
  private msalBroadCastService:MsalBroadcastService,
  private authService:MsalService,
  private azureAdService:AzureAdService)   
  {

  }
  ngOnInit(): void {
    this.msalBroadCastService.inProgress$.pipe  //login staus inprogress or completed
    (filter((interactionStatus:InteractionStatus)=>
    interactionStatus==InteractionStatus.None), //Status set when interaction is complete
    takeUntil(this._destroy))
    .subscribe(x=>
    {
      this.isUserLoggedIn=this.authService.instance.getAllAccounts().length>0
      this.azureAdService.isUserLoggedIn.next(this.isUserLoggedIn);
    })
  }
  //This code take care the destroy the subscription
  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }
  login()   //related code in appmodule
  {
    if(this.authService.loginRedirect)
    {
      this.authService.loginRedirect({...this.maslGuardConfig.authRequest} as RedirectRequest)
    }
    else
    {
      this.authService.loginRedirect();
    }
  }
  // user click logout will be redirect to azure logout page & success, 
  // logout & again the azure will redirect the request back to post logout uri that is localhost 4200.
  logout()  
  {
    this.authService.logoutRedirect({postLogoutRedirectUri:environment.postLogoutUrl});
  }
  
}
