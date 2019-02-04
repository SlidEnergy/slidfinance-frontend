import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BanksService } from 'src/app/api';

@Component({
  selector: 'app-delete-bank-dialog',
  templateUrl: './delete-bank-dialog.component.html',
  styleUrls: ['./delete-bank-dialog.component.scss']
})
export class DeleteBankDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteBankDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private banksService: BanksService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.banksService.deleteBank(this.data.id).subscribe(x => x);
  }
}
