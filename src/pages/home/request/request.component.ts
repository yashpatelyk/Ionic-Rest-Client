import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";
import { RestService } from "../../../app/shared/services/rest.service";
import { SUPPORTED_METHODS } from "../../../app/shared/constants/providers";
import { Commons } from "../../../app/shared/utilities/commons";
import { Framework } from "../../../app/shared/utilities/framework";
import { ResponseComponent } from "../response/response.component";

@Component({
    selector: 'request-form',
    templateUrl: 'request.component.html'
})

export class RequestComponent implements OnInit {

    @Output() response: EventEmitter<any> = new EventEmitter();


    requestForm: FormGroup;
    defaultHeader: object = {
        isActive: true,
        key: '',
        value: ''
    };
    canHaveBody: boolean = false

    constructor(
        private fb: FormBuilder,
        @Inject(SUPPORTED_METHODS) private methods: Array<string>,
        private restService: RestService,
        private framework: Framework
    ) { }

    ngOnInit() {
        this.requestForm = this.fb.group({
            method: ['get'],
            url: '',
            hasHeaders: false,
            headers: this.fb.array([
                this.fb.group(this.defaultHeader)
            ]),
            hasBody: false,
            body: ''
        })
    }

    /*
    * methods to be called from the view
    */

    public sendRequest(): void {
        var request: object = this.constructRequest();

        Commons.log("log", "request object is ", request);

        // call the rest service
        if (request["url"].length > 0) {

            this.restService
                .call(request["method"], request["url"], request["headers"], request["body"])
                .then(response => {
                    Commons.log("", response);
                    var modal = this.framework.openModal(ResponseComponent, { "response": response });
                    this.response.emit({ "response": response, modal: modal });
                })
                .catch(err => {
                    Commons.log("error", err);
                    this.framework.showAlert({
                        title: "An error occured",
                        message: "An error occured while processing you request",
                        buttons: ['ok']
                    });
                });
        } else {
            this.framework.showAlert({
                title: "No URL given!",
                message: "Please give an URL to send request",
                buttons: ['ok']
            });
        }
    }

    public addNewHeader(): void {
        this.headers.push(this.fb.group(this.defaultHeader));
    }

    public removeHeader(index: number): void {
        this.headers.removeAt(index);
    }

    public methodChanged(method): void {
        if (method.toLowerCase() == "get" || method.toLowerCase() == "delete") {
            this.canHaveBody = false;
            this.requestForm.setControl("hasBody", new FormControl(false));
        } else {
            this.canHaveBody = true;
        }
    }

    /*
    * methods to be called from inside the component/ private methods
    */

    get headers(): any {
        return this.requestForm.get('headers');
    }

    private constructRequest(): object {

        let rawData = this.requestForm.getRawValue();
        let formData = {
            method: rawData.method,
            url: rawData.url,
            headers: {},
            body: ''
        }

        var key = '';
        // include headers if any
        if (rawData.hasHeaders) {
            rawData.headers.forEach(header => {

                // check if header checkbox is checked or not
                if (header.isActive) {
                    formData.headers[header['key']] = header['value'];
                }

            });
        }

        // include body if allowed and provided
        if (this.canHaveBody && rawData.hasBody) {
            formData.body = rawData.body;
        }

        return formData;
    }
}