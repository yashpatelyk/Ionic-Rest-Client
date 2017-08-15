import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestService {
    constructor(private http: Http) { }

    public call(method: string, url: string, headers: object, data: any): Promise<any> {

        return new Promise((resolve, reject) => {

            method = method.toLowerCase();

            switch (method) {

                case 'get': this.get(url, headers)
                                .then(response => {
                                    resolve(response);
                                })
                                .catch(err => {
                                    reject(err);
                                });
                    break;

                case 'post': this.post(url, headers, data)
                                .then(response => {
                                    resolve(response);
                                })
                                .catch(err => {
                                    reject(err);
                                });
                    break;

                case 'put': this.put(url, headers, data)
                                .then(response => {
                                    resolve(response);
                                })
                                .catch(err => {
                                    reject(err);
                                });
                    break;

                case 'delete': this.delete(url, headers)
                                   .then(response => {
                                        resolve(response);
                                    })
                                    .catch(err => {
                                        reject(err);
                                    });
                    break;

            }
        })
    }

    /**
     * get method to test get request
     */
    private get(url: string, headers: object): Promise<any> {

        let header = new Headers(headers);
        let requestOptions = new RequestOptions({headers: header});

        return this.http
            .get(url,requestOptions)
            .toPromise()
            .then(resp => resp.json())
            .catch(err => {
                throw err;
            })

    }

    /**
     * post method to test post request
     */
    private post(url: string, headers: object, body: any): Promise<any> {

        let header = new Headers(headers);
        let requestOptions = new RequestOptions({headers: header});

        return this.http
            .post(url,body,requestOptions)
            .toPromise()
            .then(resp => resp.json())
            .catch(err => {
                throw err;
            })

    }

    /**
     * put method to test put request
     */
    private put(url: string, headers: object, body: any): Promise<any> {

        let header = new Headers(headers);
        let requestOptions = new RequestOptions({headers: header});

        return this.http
            .put(url,body,requestOptions)
            .toPromise()
            .then(resp => resp.json())
            .catch(err => {
                throw err;
            })

    }

    /**
     * delete method to test delete request
     */
    private delete(url: string, headers: object): Promise<any> {

        let header = new Headers(headers);
        let requestOptions = new RequestOptions({headers: header});

        return this.http
            .delete(url,requestOptions)
            .toPromise()
            .then(resp => resp.json())
            .catch(err => {
                throw err;
            })

    }

}