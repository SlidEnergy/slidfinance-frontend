import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {MessageDialogComponent} from './message-dialog/message-dialog.component';
import {NonFractionCurrencyOrDashPipe} from './non-fraction-currency-or-dash.pipe';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {AngularSplitModule} from 'angular-split';

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
    MatCardModule
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

    NonFractionCurrencyOrDashPipe,

    AngularSplitModule,
  ],
  entryComponents: [
    MessageDialogComponent
  ],
  providers: []
})
export class SharedModule {
}
