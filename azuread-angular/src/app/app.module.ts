import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule } from '@azure/msal-angular';
import { MsalGuard } from '@azure/msal-angular';
import { MsalInterceptor } from '@azure/msal-angular';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AzureAdService } from './azure-ad.service';
import { ReportComponent } from './report/report.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Targeting the Internet Explorer
const isIE=window.navigator.userAgent.indexOf('MSIE')>-1
||window.navigator.userAgent.indexOf('Trident/')> -1
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MsalModule.forRoot(new PublicClientApplication
    (
      {                 //Pass some details azure decide which tenant this app belogs to.
        auth:{
          clientId:'b275b930-31c0-469d-b579-dec127308131',
          redirectUri:'http://localhost:4200',        //login success here access the token
          authority:'https://login.microsoftonline.com/7896c5aa-71b4-47c3-98d4-e707bdd7462f'
        },
        cache:         //Here mentioning to store auth state
        {
          cacheLocation:'localStorage',
          storeAuthStateInCookie:isIE
        }        
      }
    ),
    {                  //Here we mention redirect login and scopes pass related our app
      interactionType:InteractionType.Redirect,
      authRequest:{
        scopes:['user.read']
      }
    },
    {                 //Here mentioning our protected resources & azure graph api 
      interactionType:InteractionType.Redirect,
      protectedResourceMap:new Map(
        [
          ['https://graph.microsoft.com/v1.0/me',['user.read']],
          ['localhost',['api://2fbac4cc-5668-496a-bc2a-0ee8431108a6/api.scope ']]
        ]
      )
    }
    )
  ],
  providers: [{      //Configure the http interceptor
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  }, MsalGuard,AzureAdService],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
