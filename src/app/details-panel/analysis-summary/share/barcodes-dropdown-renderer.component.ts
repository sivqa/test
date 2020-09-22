import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

const allOptionConst = 'All';
const platesKey = 'Plates'

@Component({
    selector: 'app-barcodes-dropdown-renderer',
    template: `
    <div style="display: block" *ngIf="isParams">
        <mat-select color="primary" multiple [(ngModel)]="barcodes" (selectionChange)="onSelectionChange($event)">
            <mat-select-trigger>
            {{displayBarcodes}}
            </mat-select-trigger>
            <mat-option *ngFor="let option of list" [value]="option">
                {{option}}
            </mat-option>
        </mat-select>
    </div>
    <div *ngIf="!isParams">{{params.value}}</div>`,
    styles: []
})

export class BarcodesDropdownRendererComponent implements ICellRendererAngularComp {
    barcodes: string[];
    params: any;
    list: string[];
    isParams: boolean;
    isAllChecked = true;
    displayBarcodes = 'All'

    constructor() { }

    agInit(params: any): void {
        this.params = params;
        this.isParams = params.data.key === platesKey;
        if (this.isParams) {
            this.list = [allOptionConst].concat(this.params.data.value);
            this.barcodes = this.list;
        }
    }

    onSelectionChange(params) {
        if (this.barcodes.length === 1 && this.isAllChecked) {
            this.isAllChecked = !this.isAllChecked;
            this.barcodes = [];
        }
        if (this.barcodes.length < this.list.length && this.isAllChecked && (this.barcodes.includes(allOptionConst))) {
            this.barcodes = this.barcodes.filter(barcode => barcode !== allOptionConst)
            this.isAllChecked = !this.isAllChecked;
        }
        if ((this.barcodes.includes(allOptionConst) && !this.isAllChecked) ||
            (this.barcodes.length + 1 === this.list.length && !this.isAllChecked)) {
            this.isAllChecked = !this.isAllChecked
            this.barcodes = this.list;
        }
        if ((!this.barcodes.includes(allOptionConst) && this.isAllChecked) ||
            (this.barcodes.length === 1 && this.isAllChecked)) {
            this.isAllChecked = !this.isAllChecked;
            this.barcodes = [];
        }
        if (this.isAllChecked) {
            this.displayBarcodes = 'All';
        } else {
            this.displayBarcodes = `${this.barcodes.length}/${this.list.length - 1}`
        }

        this.params.context.componentParent.barcodeChanged(this.barcodes.filter(x => x !== allOptionConst));
    }

    getValue() {
        return this.params.data.currentValue;
    }

    refresh(): boolean {
        return false;
    }
}
