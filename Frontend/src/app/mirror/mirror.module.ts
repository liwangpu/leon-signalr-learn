import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MirrorRoutingModule } from './mirror-routing.module';
import { HomeComponent } from './home.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        MirrorRoutingModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
    ]
})
export class MirrorModule { }
