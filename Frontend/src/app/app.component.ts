import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as signalR from "@microsoft/signalr";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public form: FormGroup;
    public connected: boolean;
    private connection: signalR.HubConnection;
    private baseUrl = 'https://d-xcloud-gateway.cxist.cn/web/message';
    private alias: string;
    public constructor(
        private snackBar: MatSnackBar,
        private httpClient: HttpClient,
        fb: FormBuilder
    ) {
        this.form = fb.group({
            token: [],
            employeeId: [],
            user: [],
            message: []
        });
    }

    public ngOnInit(): void {
        let configStr = localStorage.getItem('config');
        let config: { [key: string]: any } = {};
        if (configStr) {
            config = JSON.parse(configStr);
            this.form.patchValue(config);
        }

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.baseUrl}/signalr`, {
                accessTokenFactory() {
                    return config.token;
                },
                transport: signalR.HttpTransportType.LongPolling
            })
            .withAutomaticReconnect()
            .build();

        this.connection.on("messageReceived", function (user, message) {
            // console.log('messageReceived:', typeof message);
            console.log('messageReceived', JSON.parse(message));

        });

        this.form.patchValue({
            user: 'robot',
            message: Date.now().toString()
        });
    }

    public saveConfig(): void {
        localStorage.setItem('config', JSON.stringify(this.form.value));
        this.snackBar.open('保存成功');
    }

    public connectHub(): void {
        this.connection.start().then(() => {
            this.snackBar.open('连接成功');
            this.connected = true;
        }).catch(err => {
            this.snackBar.open('无法连接到服务器');
            this.connected = false;
        });
    }

    public disconnectHub(): void {
        // this.connection.
    }

    public sendMessage(): void {
        let { user, message } = this.form.value;
        this.connection.send("newMessage", user, message)
            .then(() => {
                this.snackBar.open(`消息发送成功:${message}`);
            });
    }

    public async sendAuthMessage(): Promise<void> {
        this.connection.send('BindAlias', this.alias);
    }

    public requestAlias(): void {
        let { employeeId } = this.form.value;
        let myId = { type: 'user', info: employeeId };
        this.httpClient.get(`${this.baseUrl}/alias?bizObjId=${JSON.stringify(myId)}`).subscribe((res: string) => {
            this.alias = res;
            console.log('alias:', res);
        });
    }
}
