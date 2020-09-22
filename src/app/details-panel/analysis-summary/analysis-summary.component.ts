import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-analysis-summary',
  templateUrl: './analysis-summary.component.html',
  styleUrls: ['./analysis-summary.component.scss']
})

export class AnalysisSummaryComponent implements OnInit {
  domLayout: string;
  rowData = [
    {
      key: "Number of input samples",
      value: "384"
    },
    {
      key: "Number of input samples",
      value: "384"
    },
    {
      key: "Number of input samples",
      value: "384"
    },
    {
      key: "Number of input samples",
      value: "384"
    },
    {
      key: "Number of input samples",
      value: "384"
    },
    {
      key: "Number of input samples",
      value: "384"
    },
    {
      key: "Number of input samples",
      value: "384"
    }
  ]
  columnDefs = [
    {
      colId: 'col_1',
      field: 'key',
      width: 255,
      autoHeight: true
    },
    {
      field: 'value',
      width: 250
    },
  ];;
  defaultColDef = {
    sortable: false,
    resizable: false,
    filter: false
  };

  constructor() { }

  ngOnInit() {

    this.domLayout = 'autoHeight';
  }
}
