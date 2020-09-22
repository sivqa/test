import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

const sampleQcConst = 'sample_qc';
const dqcConst = 'axiom_dishqc_DQC';
const qcCallRateConst = 'qc_call_rate';

@Component({
  selector: 'app-plots-carousel',
  templateUrl: './plots-carousel.component.html',
  styleUrls: ['./plots-carousel.component.scss']
})

export class PlotsCarouselComponent {
  barcodes: ["5507934335443080918800"];

  plotDataList = [[{
    barcode: "5507934335443080918800",
    callRate: 98.96076,
    computedGender: "male",
    dishQc: 0.98387,
    name: "3065_(Axiom_PigGen01)_L21.CEL",
    position: "L21",
    qcCallRate: 99.13176,
    scanArrayHeight: 1948,
    scanArrayWidth: 1948,
    scanDate: "2017-05-12T00:55:20Z",
    state: "Pass",
  }]];

  dqcThreshold = 0.8;
  qcCallRateThreshold = 80;

  carouselOptions = {
    nav: true,
    dots: false,
    navText: [`<span class="fas fa-chevron-left fa-2x"></span>`, `<span class="fas fa-chevron-right fa-2x"></span>`],
    responsive: {
      0: {
        items: 1
      }
    }
  }

  constructor() { }
}
