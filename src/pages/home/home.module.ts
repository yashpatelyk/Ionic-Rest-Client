import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { HomePage } from './home';
import { RequestComponent } from './request/request.component';
import { ResponseComponent } from "./response/response.component";

@NgModule({
    imports: [
        IonicPageModule.forChild(HomePage),
        IonicPageModule.forChild(RequestComponent),
        IonicPageModule.forChild(ResponseComponent)
    ],

    exports: [],

    declarations: [
        HomePage,
        RequestComponent,
        ResponseComponent
    ],

    providers: [],
})
export class HomeModule { }


