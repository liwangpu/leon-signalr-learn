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
    public connectionId: string;
    private connection: signalR.HubConnection;
    public constructor(
        private snackBar: MatSnackBar,
        fb: FormBuilder
    ) {
        this.form = fb.group({
            user: [],
            message: []
        });
    }

    public ngOnInit(): void {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:9871/chathub", {
                accessTokenFactory: () => {
                    return 'qjptBT3_R_f3Gksq1QLmUR_CjVgUE_mQcGBqRYLXtTI';
                }
            })
            // .withUrl("http://localhost:9882/chathub", {
            //     accessTokenFactory: () => {
            //         return 'qjptBT3_R_f3Gksq1QLmUR_CjVgUE_mQcGBqRYLXtTI';
            //     }
            // })
            .build();

        this.connection.on("send", data => {
            console.log(data);
        });

        this.connection.on("ReceiveMessage", function (user, message) {
            console.log('ReceiveMessage', user, message);

        });

        this.connection.on('broadcastchartdata', (data) => {
            console.log('broadcastchartdata', data);
        })

        this.form.patchValue({
            user: 'robot',
            message: Date.now().toString()
        });
    }

    public connectHub(): void {
        this.connection.start().then(() => {
            this.snackBar.open('连接成功');
            // this.connection.invoke("send", "Hello")
            this.connected = true;
        })
            .then(() => this.getConnectionId())
            .catch(err => {
                this.snackBar.open('无法连接到服务器');
                this.connected = false;
            });
    }

    public disconnectHub(): void {
        // this.connection.
    }

    public sendMessage(): void {
        let { user, message } = this.form.value;
        this.connection.invoke("BroadcastChartData", [])
            .then(() => {
                this.snackBar.open(`消息发送成功:${message}`);
            });
    }

    public getConnectionId = () => {
        this.connection.invoke('getconnectionid').then(
            (data) => {
                this.connectionId = data;
            }
        );
    }
}
