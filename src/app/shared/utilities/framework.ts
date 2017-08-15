import { Injectable, Component } from '@angular/core';
import { AlertController, AlertOptions, Alert, ModalController, Modal } from "ionic-angular";

@Injectable()
export class Framework {

    alert: Alert;
    modal: Modal;
    params: any;

    constructor(
        private alertCtrl: AlertController,
        private modalCtrl: ModalController
    ) { }

    showAlert(opts: AlertOptions): Alert {

        this.alert = this.alertCtrl.create(opts)
        this.alert.present();

        return this.alert;
    }

    hideAlert(): void {
        this.alert.dismiss();
    }

    openModal(page: Component, params: any): Modal {

        this.params = params;
        this.modal = this.modalCtrl.create(page, params);
        this.modal.present();

        return this.modal;

    }

    closeModal(): void {
        this.modal.dismiss();
    }

    getCurrentPageParams(): any {
        return this.params;
    }
}