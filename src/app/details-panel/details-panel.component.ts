import { Component } from '@angular/core';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
   selector: 'app-details-panel',
   templateUrl: './details-panel.component.html',
   styleUrls: ['./details-panel.component.scss'],
})

export class DetailsPanelComponent {

   faCloudDownloadAlt = faCloudDownloadAlt;

   constructor( ) { }
}
