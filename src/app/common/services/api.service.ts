import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }
    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': 'Yn8uMnIhcg==.'
        })
    };

    // Handle API errors
    handleError(error: HttpErrorResponse) {
        let errorMesaage = 'Something bad happened; please try again later.';
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
            errorMesaage = `${JSON.stringify(error.error.message)}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `message was: ${JSON.stringify(error.error.errors)}`);
            errorMesaage = `${JSON.stringify(error.error.errors) || JSON.stringify(error.error.message)}`;
        }
        // return an observable with a user-facing error message
        return throwError(errorMesaage);
    }
    post(url: string, data: any) {
        return this.http
            .post(url, data, this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    put(url: string, data: any) {
        return this.http
            .put(url, data, this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
    get(url: string) {
        return this.http
            .get(url, this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
}
