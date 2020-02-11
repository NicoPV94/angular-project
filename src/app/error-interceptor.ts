import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorComponent } from './error/error.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // if (error.error.message === 'Authentication failed.') {
        //   this.snackBar.open('Invalid email or password', 'Dismiss', {
        //     duration: 3000,
        //   });
        // } else if (error.error.error._message === 'User validation failed') {
        //   this.snackBar.open('Email already in use', 'Dismiss', {
        //     duration: 3000,
        //   });
        // }
        let errorMessage = 'An unknown error occurred!'
        if(error.error.message) {
            errorMessage = error.error.message;
        }
        // this.dialog.open(ErrorComponent, {data: {message: errorMessage}})
        this.snackBar.openFromComponent(ErrorComponent, {
            data: {message: errorMessage},
            duration: 3000
        })
        return throwError(error); //Returns obsersable with the error.
      }),
    );
  }
}
