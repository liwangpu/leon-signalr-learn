import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as signalR from "@microsoft/signalr";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public form: FormGroup;
    public canConnect: boolean ;
    // public canConnect: boolean = true;
    public connected: boolean;
    private token: string;
    private connection: signalR.HubConnection;
    // private baseUrl = 'http://localhost:9882';
    private baseUrl = 'http://localhost:9871';
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
            .withUrl(`${this.baseUrl}/hub/chathub`, {
                accessTokenFactory() {
                    return localStorage.getItem('access_token');
                },
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build();

        this.connection.on("ReceiveMessage", (message) => {
            // console.log('messageReceived',message);
            this.snackBar.open(`接收到消息:${message}`, null, { duration: 2000 });
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
            this.token = res.access_token;
            this.canConnect = true;
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('latest_login', JSON.stringify(account));
            this.snackBar.open(`登陆成功`, null, { duration: 2000 });
        });
    }

    public connectHub(): void {
        this.connection.start().then(() => {
            this.snackBar.open('连接成功', null, { duration: 2000 });
            this.connected = true;
        }).catch(err => {
            this.snackBar.open('无法连接到服务器', null, { duration: 2000 });
            this.connected = false;
        });
    }

    public disconnectHub(): void {

    }

    public sendMessage(): void {

    }

}
