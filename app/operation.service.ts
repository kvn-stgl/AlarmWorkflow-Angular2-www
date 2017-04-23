import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';

import { SignalrWindow } from './signalr';
import { Operation } from './operation';

@Injectable()
export class OperationService {
    /**
     * starting$ is an observable available to know if the signalr
     * connection is ready or not. On a successful connection this
     * stream will emit a value.
     */
    starting$: Observable<any>;

    /**
     * error$ provides a stream of any error messages that occur on the
     * SignalR connection
     */
    error$: Observable<string>;

    receive: Observable<any>;
    reset: Observable<any>;
    resources: Observable<any>;

    private operation: Operation;

    // These are used to feed the public observables
    private startingSubject = new Subject<any>();
    private errorSubject = new Subject<any>();

    private resetSubject = new Subject<any>();
    private receiveSubject = new Subject<any>();
    private resourcesSubject = new Subject<any>();

    // These are used to track the internal SignalR state
    private hubProxy: any;
    private hub: any;

    constructor(@Inject(SignalrWindow) private window: SignalrWindow, private http: Http) {

        this.hub = this.window.$.connection.hub;
        this.hubProxy = this.window.$.connection.operationHub;

        // Set up our observables
        this.starting$ = this.startingSubject.asObservable();
        this.error$ = this.errorSubject.asObservable();

        this.receive = this.receiveSubject.asObservable();
        this.reset = this.resetSubject.asObservable();
        this.resources = this.resourcesSubject.asObservable();

        this.hubProxy.client.resetOperation = () => {
            this.resetOperation();
            this.resetSubject.next();
        };

        this.hubProxy.client.receiveOperation = (operation:any) => {
            this.operation = Operation.fromJS(operation);
            this.receiveSubject.next(this.operation);
        }

        this.hubProxy.client.reloadResources = (opId: number) => {
            this.resourcesSubject.next(opId);
        }

        // Define handlers for any errors
        this.hub.error((error: any) => {
            // Push the error on our subject
            this.errorSubject.next(error);
        });

        this.hub.reconnecting(() => {
            $('#connectionLabel').show();
        });

        this.hub.reconnected(() => {
              $('#connectionLabel').hide();
        });

        this.hub.disconnected(() => {
            $('#connectionLabel').show();
            setTimeout(() => {
              $('#connectionLabel').hide();
              this.start();
            }, 10000); // Restart connection after 10 seconds.
        });
    }

    /**
     * Get the acutal hub proxy.
     */
    public getHubProxy() {
        return this.hubProxy;
    }

    /**
     * Get the operation.
     */
    public getOperation(id: number): Promise<Operation> {
        if (this.operation && this.operation.id === id) {
            return new Promise((resolve, reject) => {
                resolve(this.operation);
            });
        } else {
            return this.http.get(devUrl + '/api/operation/' + id)
                .toPromise()
                .then(response => Operation.fromJS(response.json()))
                .catch(this.handleError);
        }
    }

    /**
     * Set the actual operation to null.
     */
    public resetOperation() {
        this.operation = null;
    }

    private handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    /**
     * Start the SignalR connection. The starting$ stream will emit an
     * event if the connection is established, otherwise it will emit an
     * error.
     */
    start(): void {
        this.hub.start()
            .done(() => {
                this.startingSubject.next();
            })
            .fail((error: any) => {
                this.startingSubject.error(error);
            });
    }
}
