import { Component, HostListener } from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-probesets-modal',
  templateUrl: './probesets.component.html',
  styleUrls: ['./probesets.component.scss']
})

export class ProbesetsComponent {

  faCopy = faCopy;

  gridApi: any;
  gridColumnApi: any;

  rowData = [{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },{
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 11.519,
    hwpValue: 0.759,
    minorAlleleFrequency: 0.495,
    affySnpId: 'Affx-2643493',
    probesetId: 'AFFX-SP-000001'
  },
  {
    bestProbeset: 1,
    BestandRecommended: 1,
    cr: 100,
    conversionType: 'PolyHighResolution',
    fld: 9.767,
    hwpValue: 0.403,
    minorAlleleFrequency: 0.447,
    affySnpId: 'Affx-7455925',
    probesetId: 'AFFX-SP-000002'
  }];

  overlayNoRowsTemplate = "<span>Loading...</span>";

  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: false
  };

  columnDefs = [
    {
      headerName: 'Probeset ID',
      field: 'probesetId'
    },
    {
      headerName: 'Affy SNP ID',
      field: 'affySnpId'
    },
    {
      headerName: 'Conversion Type',
      field: 'conversionType'
    },
    {
      headerName: 'CR', field: 'cr',
    },
    {
      headerName: 'BestProbeset',
      field: 'bestProbeset'
    },
    {
      headerName: 'Minor Allele Frequency',
      field: 'minorAlleleFrequency'
    },
    {
      headerName: 'FLD', field: 'fld'
    },
    {
      headerName: 'H.W. p-Value',
      field: 'hwpValue'
    }
  ];

  constructor() { }

  getData() {
    this.gridApi.setRowData(this.rowData)
  }

  resizeColumns() {
    if (!this.gridColumnApi)
      return;
    this.gridApi.sizeColumnsToFit();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeColumns();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    console.log(this.rowData)
    params.api.setRowData(this.rowData)
    this.gridColumnApi = params.columnApi;
    this.resizeColumns();
  }
}
