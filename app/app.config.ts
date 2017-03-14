import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppConfig {

    private configShared:     Object = null;
    private configWebService: Object = null;

    constructor(private http: Http) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
     return this.configWebService[key];
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    public getShared(key: any) {
     return this.configShared[key];
    }

    /**
     * This method:
     *   a) Loads "api/settings/Shared" to get the shared config
     *   b) Loads "api/settings/WebService" to get the special web service config
     */
    public load() {
      console.log("Load Config");

      return new Promise((resolve, reject) => {
        this.http.get(devUrl + '/api/settings/Shared')
          .map(res => res.json())
          .catch((error: any): any => {
            console.log('Configuration file "api/settings/Shared" could not be read');
            resolve(true);
            return Observable.throw(error.json().error || 'Server error');
          }).subscribe((responseDataShared) => {
            this.configShared = responseDataShared;

            this.http.get(devUrl + '/api/settings/WebService')
              .map(res => res.json())
              .catch((error: any): any => {
                console.log('Configuration file "api/settings/WebService" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
              }).subscribe((responseData) => {
                this.configWebService = responseData;
                resolve(true);
              });
          });
      });
    }

}