// ionic and angular
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'


// pages
import { MyApp } from './app.component';
import { HomeModule } from  '../pages/home/home.module'
// import { HomePage } from '../pages/home/home';
// import { RequestComponent } from '../pages/home/request/request.component';


// shared
import { SUPPORTED_METHODS, methods } from './shared/constants/providers'
import { RestService } from "./shared/services/rest.service";
import { Framework } from "./shared/utilities/framework";



@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    HomeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: SUPPORTED_METHODS, useValue: methods},
    RestService,
    Framework
  ]
})
export class AppModule {}
