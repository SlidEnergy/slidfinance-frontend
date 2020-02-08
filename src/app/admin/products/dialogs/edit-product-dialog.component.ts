import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Product} from 'src/app/api';

@Component({
    selector: 'app-edit-product-dialog',
    templateUrl: './edit-product-dialog.component.html',
    styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {
    }

    ngOnInit() {
    }
}
