import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as signalR from "@microsoft/signalr";
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public form: FormGroup;
    public hasLogin: boolean;
    public canConnect: boolean;
    public tokenUUID: string;
    public employeeId: string;
    @ViewChild('uuidContainer')
    private uuidContainer: ElementRef;
    private connection: signalR.HubConnection;
    private baseUrl = 'http://cxvpn.cxist.com:22504';
    public constructor(
        private snackBar: MatSnackBar,
        private httpClient: HttpClient,
        fb: FormBuilder
    ) {
        this.form = fb.group({
            username: [],
            password: []
        });
    }

    public ngOnInit(): void {
        let lastLoginStr = localStorage.getItem('latest_login');
        if (lastLoginStr) {
            this.form.patchValue(JSON.parse(lastLoginStr));
        }

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.baseUrl}/message/signalr`, {
                accessTokenFactory() {
                    console.log('accessTokenFactory work');
                    return localStorage.getItem('access_token');
                },
                transport: signalR.HttpTransportType.LongPolling
            })
            .withAutomaticReconnect()
            .build();

        this.connection.on("messageReceived", (username: string, message: string) => {
            console.log('messageReceived:', username, message);
            this.snackBar.open(`收到服务消息`, null, { duration: 2000 });
        });

        this.connection.onreconnecting(async connectionId => {
            this.snackBar.open(`连接已经断开,正在尝试重连`, null, { duration: 2000 });
        });
    }

    public async login(): Promise<void> {
        let account = this.form.value;
        let url: string = `${this.baseUrl}/ids/connect/token`;
        const body: FormData = new FormData();
        body.set('grant_type', 'password');
        body.set('client_id', 'server');
        body.set('username', account.username);
        body.set('password', account.password);
        this.httpClient.post<any>(url, body).subscribe(res => {
            this.canConnect = true;
            this.hasLogin = true;
            this.tokenUUID = res.uuid;
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('refresh_token', res.refresh_token);
            localStorage.setItem('latest_login', JSON.stringify(account));
            this.snackBar.open(`登陆成功`, null, { duration: 2000 });
        });
    }

    public async logout(): Promise<void> {
        await this.httpClient.get<any>(`${this.baseUrl}/ids/Grant/OffLine/uuid/${this.tokenUUID}`).toPromise();
        this.snackBar.open(`注销成功`, null, { duration: 2000 });
        this.hasLogin = false;
    }

    public async getProfile(): Promise<void> {
        let res = await this.httpClient.get<any>(`${this.baseUrl}/ids/Identity/Profile`).toPromise();
        this.employeeId = res.employeeId;
    }

    public async refreshToken(): Promise<void> {
        const body: FormData = new FormData();
        body.set('grant_type', 'refresh_token');
        body.set('client_id', 'server');
        body.set('refresh_token', localStorage.getItem('refresh_token'));
        let res = await this.httpClient.post<any>(`${this.baseUrl}/ids/connect/token`, body).pipe(catchError(err => {
            return of({});
        })).toPromise();
        console.log('refreshToken:', res);

    }

    public async connectHub(): Promise<void> {
        if (!this.employeeId) {
            await this.getProfile();
        }
        await this.connection.start();
        let myId = { type: 'user', info: this.employeeId };
        const alias = await this.httpClient.get(`${this.baseUrl}/message/alias?bizObjId=${JSON.stringify(myId)}`).toPromise();
        await this.connection.send('BindAlias', alias, 'mobile');
        this.snackBar.open(`连接成功`, null, { duration: 2000 });
        this.canConnect = false;
    }

}
