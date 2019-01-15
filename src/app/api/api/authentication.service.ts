/**
 * SharpDevBackend
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { AuthInfoWithToken } from '../model/authInfoWithToken';


@Injectable()
export class AuthenticationService {

    protected basePath = '';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }

    /**
     * Проводит аутентификацию пользователя и выдает токен
     * 
     * @param username Имя входа
     * @param password Пароль
     * @param grantType Тип авторизации
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getToken(username: string, password: string, grantType: string, observe?: 'body', reportProgress?: boolean): Observable<AuthInfoWithToken>;
    public getToken(username: string, password: string, grantType: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AuthInfoWithToken>>;
    public getToken(username: string, password: string, grantType: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AuthInfoWithToken>>;
    public getToken(username: string, password: string, grantType: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (username === null || username === undefined) {
            throw new Error('Required parameter username was null or undefined when calling getToken.');
        }
        if (password === null || password === undefined) {
            throw new Error('Required parameter password was null or undefined when calling getToken.');
        }
        if (grantType === null || grantType === undefined) {
            throw new Error('Required parameter grantType was null or undefined when calling getToken.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/x-www-form-url-encoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void | HttpParams; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        }

        if (username !== undefined) {
            formParams = formParams.append('username', <any>username) || formParams;
        }
        if (password !== undefined) {
            formParams = formParams.append('password', <any>password) || formParams;
        }
        if (grantType !== undefined) {
            formParams = formParams.append('grant_type', <any>grantType) || formParams;
        }

        return this.httpClient.post<AuthInfoWithToken>(`${this.basePath}/token`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}
