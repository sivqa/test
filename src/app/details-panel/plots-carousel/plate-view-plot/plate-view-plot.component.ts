import { Component, Input, SimpleChanges, OnChanges, OnInit, HostListener } from '@angular/core';
import * as d3 from 'd3';

const plate384Size = {
   x: 24,
   y: 16,
};
const plate96Size = {
   x: 12,
   y: 8,
};
const affyDqcConst = 'axiom_dishqc_DQC';
const affyQcCallRateConst = 'qc_call_rate';
const plotCarouselConst = 'plot-carousel';
const containerConst = 'container';
const defaultPlateMargin = { top: 10, right: 50, bottom: 50, left: 40 };
const defaultPlateHeight = 350;
const WidthHeightLimit = 2000;
const min384PlotWidth = 1000;
const min96PlotWidth = 500;
const popupMargin = 160;
const passingColor = '#4169E1';
const failingColor = '#ff0000';
const firstChar = 'A';
const roundDigitsCount = 3;
const popupId = 'details-panel-modal';
const carouselMargin = 50;

@Component({
   selector: 'app-plate-view-plot',
   templateUrl: './plate-view-plot.component.html',
   styleUrls: ['./plate-view-plot.component.scss'],
})
export class PlateViewPlotComponent implements OnChanges {
   @Input() samplesDetails: any;
   @Input() threshold: number;
   @Input() metric: string;
   containerId: string;
   xLength: number;
   yLength: number;
   xLabels: string[];
   yLabels: string[];
   title: string;
   data: any;
   constructor() { }

   ngOnChanges(changes: SimpleChanges) {
      if (changes.samplesDetails) {
         this.samplesDetails = changes.samplesDetails.currentValue;
      }
      if (changes.threshold) {
         this.threshold = changes.threshold.currentValue;
      }
      this.init();
   }

   init() {
      console.log(this.samplesDetails)
      if (!this.samplesDetails) {
         return;
      }
      this.containerId = `${containerConst}-${this.samplesDetails[0].barcode}-${this.metric}`;

      if (!this.samplesDetails || !this.threshold) {
         return;
      }
      this.getPlateFormat();
      this.xLabels = this.getXLabels(this.xLength);
      this.yLabels = this.getYLabels(this.yLength);

      this.fillData();
      this.buildPlot();
   }

   fillData() {
      this.data = [];
      for (let i = 0; i < this.yLength; i++) {
         const row = [];
         for (let j = 0; j < this.xLength; j++) {
            row.push(0);
         }
         this.data.push(row);
      }
      if (this.metric === affyDqcConst) {
         this.title = 'DQC by Plate';
         this.samplesDetails.map((sample) => {
            const wellPosition = this.getWellPosition(sample);
            this.data[wellPosition.y][wellPosition.x] = {
               value: sample.dishQc,
               sample: sample['name'],
               state: sample.state,
            };
            return sample;
         });
      }
      if (this.metric === affyQcCallRateConst) {
         this.title = 'QC Call Rate by Plate';
         this.samplesDetails.map((sample) => {
            const wellPosition = this.getWellPosition(sample);
            if (sample.qcCallRate) {
               this.data[wellPosition.y][wellPosition.x] = {
                  value: sample.qcCallRate,
                  sample: sample['name'],
                  state: sample.state,
               };
            }
            return sample;
         });
      }
   }

   getPlateFormat() {
      this.xLength = plate96Size.x;
      this.yLength = plate96Size.y;
      this.samplesDetails.map((sample) => {
         const wellPosition = this.getWellPosition(sample);
         const sampleArrayWidth = sample.scanArrayWidth;
         const sampleArrayHeight = sample.scanArrayHeight;
         if (
            wellPosition.x > plate96Size.x ||
            wellPosition.y > plate96Size.y ||
            (sampleArrayWidth &&
               sampleArrayHeight &&
               (sampleArrayWidth < WidthHeightLimit || sampleArrayHeight < WidthHeightLimit))
         ) {
            this.xLength = plate384Size.x;
            this.yLength = plate384Size.y;
         }
         return sample;
      });
   }

   getWellPosition(sample: any) {
      const wellPosition = sample.position;
      return {
         x: +wellPosition.substring(1, wellPosition.length) - 1,
         y: wellPosition.charCodeAt(0) - firstChar.charCodeAt(0),
      };
   }

   getYLabels(length) {
      const a = [];
      let i = firstChar.charCodeAt(0);
      const j = i + length;
      for (; i < j; ++i) {
         a.push(String.fromCharCode(i));
      }
      return a;
   }

   getXLabels(length) {
      const a = [];
      let i = 1;
      const j = i + length;
      for (; i < j; ++i) {
         a.push(i.toString());
      }
      return a;
   }

   @HostListener('window:resize', ['$event'])
   onResize(event) {
      this.buildPlot();
   }

   buildPlot() {
      let intervalID = setInterval(() => {
         const popupWidth = document.getElementsByClassName(popupId)[0].clientWidth;
         document.getElementById(plotCarouselConst).style.width = `${popupWidth - carouselMargin}px`;
         const margin = defaultPlateMargin;

         let height = defaultPlateHeight,
            width: number;
         // add the tooltip area to the webpage
         const tooltip = d3
            .select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

         const containerWidth = document.getElementById(plotCarouselConst).clientWidth;
         const maxValue = containerWidth - popupMargin;
         let minPlotWidth;
         if (this.xLength === plate96Size.x) {
            minPlotWidth = min96PlotWidth;
         } else {
            minPlotWidth = min384PlotWidth;
         }
         width = d3.max([maxValue, minPlotWidth]);
         width = getSize(width, this.xLength);
         height = getSize(height, this.yLength);
         const totalwidth = width + margin.left + margin.right;

         document.getElementById(this.containerId).style.width = `${totalwidth}px`;
         document.getElementById(plotCarouselConst).style.minWidth = `${minPlotWidth + popupMargin}px`;

         function getSize(val, by) {
            return val - (val % by);
         }

         const numrows = this.data.length;
         const numcols = this.data[0].length;

         d3.select(`#${this.containerId}`).select('svg').remove();
         const svg = d3
            .select(`#${this.containerId}`)
            .append('svg')
            .attr('width', totalwidth)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

         svg.append('rect')
            .style('stroke', 'black')
            .style('stroke-width', '0.2em')
            .attr('width', width)
            .attr('height', height);

         const xDomain: any = d3.range(numcols);
         xDomain.map((a) => a.toString());
         const x = d3
            .scaleBand()
            .domain(xDomain)
            .rangeRound([0, width]);

         const yDomain: any = d3.range(numrows);
         yDomain.map((a) => a.toString());
         const y = d3
            .scaleBand()
            .domain(yDomain)
            .rangeRound([0, height]);

         const row = svg
            .selectAll('.row')
            .data(this.data)
            .enter()
            .append('g')
            .attr('class', 'row')
            .attr('transform', function (d, i) {
               return 'translate(0,' + y(i.toString()) + ')';
            });
         const cell = row
            .selectAll('.cell')
            .data(function (d) {
               return d as any;
            })
            .enter()
            .append('g')
            .attr('class', 'cell')
            .attr('transform', function (d, i) {
               return 'translate(' + x(i.toString()) + ', 0)';
            });

         cell
            .append('rect')
            .attr('width', x.bandwidth())
            .attr('height', y.bandwidth())
            .style('stroke-width', 0);

         cell
            .append('text')
            .attr('font-size', function (d) {
               return '0.8em';
            })
            .attr('dy', '.32em')
            .attr('x', x.bandwidth() / 2)
            .attr('y', y.bandwidth() / 2)
            .attr('text-anchor', 'middle')
            .style('fill', 'black')
            .text(function (d) {
               if (d === 0) {
                  return '';
               }
               return roundFloat(d['value']).toString();
            })
            .on('mouseover', function (d) {
               tooltip.style('display', null);
               tooltip
                  .transition()
                  .duration(200)
                  .style('opacity', 0.9);
               const matrix = this.getScreenCTM().translate(+this.getAttribute('cx'), +this.getAttribute('cy'));
               tooltip
                  .style('position', 'absolute')
                  .style('background-color', 'white')
                  .style('border', 'solid')
                  .style('border-width', '1px')
                  .style('border-radius', '5px')
                  .style('padding', '10px')
                  .style('left', window.pageXOffset + matrix.e + 5 + 'px')
                  .style('top', window.pageYOffset + matrix.f - 35 + 'px')
                  .html(d['sample']);
            })
            .on('mouseout', function (d) {
               tooltip.style('display', 'none');
               tooltip
                  .transition()
                  .duration(500)
                  .style('opacity', 0);
            });

         cell
            .append('line')
            .style('stroke', function (d, i) {
               return d === 0 ? 'black' : 'none';
            })
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', x.bandwidth())
            .attr('y2', y.bandwidth());
         cell
            .append('line')
            .style('stroke', function (d, i) {
               return d === 0 ? 'black' : 'none';
            })
            .attr('x1', x.bandwidth())
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', y.bandwidth());
         const threshold = this.threshold;
         cell
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', y.bandwidth())
            .attr('width', x.bandwidth())
            .style('stroke', 'black')
            .style('fill', 'none')
            .style('stroke-width', 1);
         row.selectAll('.cell').style('fill', function (d: any, i) {
            if (d === 0) {
               return 'white';
            }
            return roundFloat(d.value) >= threshold ? passingColor : failingColor;
         });

         const labels = svg.append('g').attr('class', 'labels');

         const columnLabels = labels
            .selectAll('.column-label')
            .data(this.xLabels)
            .enter()
            .append('g')
            .attr('class', 'column-label')
            .attr('transform', function (d, i) {
               return 'translate(' + x(i.toString()) + ',' + height + ')';
            });

         columnLabels
            .append('text')
            .attr('x', x.bandwidth() / 2 + 5)
            .attr('y', y.bandwidth() / 2)
            .attr('dy', '.32em')
            .attr('text-anchor', 'end')
            .text(function (d) {
               return d.toString();
            });

         const rowLabels = labels
            .selectAll('.row-label')
            .data(this.yLabels)
            .enter()
            .append('g')
            .attr('class', 'row-label')
            .attr('transform', function (d, i) {
               return 'translate(' + 1 + ',' + y(i.toString()) + ')';
            });

         rowLabels
            .append('text')
            .attr('x', -8)
            .attr('y', y.bandwidth() / 2)
            .attr('dy', '.32em')
            .attr('text-anchor', 'end')
            .text(function (d) {
               return d.toString();
            });

         function roundFloat(value: any) {
            return value ? Math.round(+value * Math.pow(10, roundDigitsCount)) / Math.pow(10, roundDigitsCount) : value;
         }
         clearInterval(intervalID);
      }, 1);
   }
}
