import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Bank, BanksService } from 'src/app/api';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bank-dialog',
  templateUrl: './add-bank-dialog.component.html',
  styleUrls: ['./add-bank-dialog.component.scss']
})
export class AddBankDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddBankDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bank,
    private banksService: BanksService
  ) { }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.banksService.addBank(this.data).subscribe(x => x);
  }
}
