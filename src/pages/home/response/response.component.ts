import { Component, OnInit } from '@angular/core';
import { Framework } from "../../../app/shared/utilities/framework";
import { Commons } from "../../../app/shared/utilities/commons";

@Component({
    selector: 'response-modal',
    templateUrl: 'response.component.html'
})

export class ResponseComponent implements OnInit {
    response: String;

    constructor(
        private framework: Framework,
    ) { }

    ngOnInit() {
        this.response = JSON.stringify(this.framework.getCurrentPageParams()["response"]);
    }


    /*
    * methods to be called from the view
    */
    close(){
        this.framework.closeModal();
    }

    /*
    * methods to be called from inside the component/ private methods
    */


}