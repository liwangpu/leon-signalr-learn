import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialRoutingModule } from './tutorial-routing.module';
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
        TutorialRoutingModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
    ]
})
export class TutorialModule { }
