import { Component, Inject } from '@angular/core';
import { NavController, Modal } from 'ionic-angular';
import { SUPPORTED_METHODS } from "../../app/shared/constants/providers";
import { RestService } from "../../app/shared/services/rest.service";
import { Commons } from "../../app/shared/utilities/commons";
import { Framework } from "../../app/shared/utilities/framework";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  responseArrived: boolean = false;
  response: any;
  modal: Modal;

  constructor(
    public navCtrl: NavController,
    public framework: Framework
  ) { }

  ngOnInit() {

    /*this.restService
      .call("GET", "https://reqres.in/api/users?page=2", {}, null)
      .then(response => console.log(response))
      .catch(err => console.log(err));

    this.restService
      .call("POST", "https://reqres.in/api/users", {}, { "name": "morpheus", "job": "leader" })
      .then(response => console.log(response))
      .catch(err => console.log(err));

    this.restService
      .call("PUT", "https://reqres.in/api/users/2", {}, { "name": "morpheus", "job": "leader" })
      .then(response => console.log(response))
      .catch(err => console.log(err));

      this.restService
      .call("DELETE", "https://reqres.in/api/users/2", {},null)
      .then(response => console.log(response))
      .catch(err => console.log(err));*/
  }

  /*
  * methods to be called from the view
  */

  public onResponse(event): any {
    this.response = event.response;
    this.modal = event.modal;
    this.responseArrived = true;
  }

  public showResponse(): any{
    this.modal.present();
  }

  public discardResponse(): any{
    this.framework.showAlert({
      title: "Discard Reponse",
      message: "Are you sure you want to discard the response?",
      buttons: [
        {
          text:"Discard",
          handler: () => {
            this.responseArrived = false
          }
        },
        {
          text:"Cancel",
          role:"cancel"
        }
      ]
    })
  }

  /*
  * methods to be called from inside the component/ private methods
  */



}
