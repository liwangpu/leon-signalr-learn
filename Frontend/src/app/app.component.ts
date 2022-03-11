import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const menuCollapseStatusKey = 'menuCollapseStatus';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

    public isCollapsed = false;
    public constructor() {
        const menuCollapseStatusKeyStr = localStorage.getItem(menuCollapseStatusKey);
        if (menuCollapseStatusKeyStr) {
            this.isCollapsed = JSON.parse(menuCollapseStatusKeyStr);
        }
    }

    public ngOnInit(): void {

    }

    public toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
        localStorage.setItem(menuCollapseStatusKey, `${this.isCollapsed}`);
    }

    public boxClick(event: MouseEvent): void {
        console.log('box click');

    }

    public buttonClick(event: MouseEvent): void {
        console.log('button click');
    }

    public pClick(event: MouseEvent): void {
        console.log('p click');
    }
}
