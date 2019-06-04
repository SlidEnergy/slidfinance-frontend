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
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { NonFractionCurrencyOrDashPipe } from './non-fraction-currency-or-dash.pipe';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

@NgModule({
    declarations: [
        MessageDialogComponent,
        NonFractionCurrencyOrDashPipe,
        TransactionsListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatDialogModule,
        MatButtonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatCardModule,
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
        MatPaginatorModule,
        MessageDialogComponent,
        TransactionsListComponent,

        NonFractionCurrencyOrDashPipe
    ],
    entryComponents: [
        MessageDialogComponent
    ],
    providers: [
    ]
})
export class SharedModule { }
