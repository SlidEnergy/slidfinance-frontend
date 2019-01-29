import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatNativeDateModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule, MatSnackBarModule, MatTableModule, 
    MatAutocompleteModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule, MatMenuModule, MatDialogModule, MatPaginatorModule
} from '@angular/material';

import { MatProgressButtonsModule } from 'mat-progress-buttons'

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        MatNativeDateModule,
        FormsModule,
        MatDatepickerModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatRadioModule,
        MatSnackBarModule,
        MatTableModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatProgressButtonsModule,
        MatSelectModule,
        MatSortModule,
        MatMenuModule,
        MatDialogModule,
        MatPaginatorModule
    ],
    providers: [
    ]
})
export class SharedModule { }
