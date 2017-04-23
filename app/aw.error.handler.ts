import { ErrorHandler, Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AwErrorHandler extends ErrorHandler {

  private static SHOW_ERROR = false;

  constructor(private http: Http) {
    // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
    // when an error happens. If we do not rethrow, bootstrap will always succeed.
    super(true);
  }

  handleError(error: any) {
      let message = this.extractMessage(error);
      // Send HTTP Request sometime ..

      // Show User
      let e = $('#errorLabel');
      if (e && AwErrorHandler.SHOW_ERROR) {
          e.html(`JavaScript Error. Maybe the server is down. Please reload the page. <br />
          Message: ${message}`);
          e.show();
      }

      super.handleError(error);
  }

  extractMessage(error: any): string {
    return error instanceof Error ? error.message : error.toString();
  }
}
