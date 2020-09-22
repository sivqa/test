import { Component, Input, SimpleChanges, OnChanges, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';

const container = '#scatter-container';
const maleGender = 'male';
const femaleGender = 'female';
const unknownGender = 'unknown';
const maleColor = 'yellow';
const femaleColor = 'red';
const unknownColor = 'gray';
const defaultPlateMargin = { top: 10, right: 10, bottom: 60, left: 80 };
const defaultPlateHeight = 500;
const popupMargin = 265;
const invisiblePositionConst = -200;
const popupId = 'details-panel-modal';
const minPlotWidth = 300;
const qcCallRateDisplay = 'QC Call Rate';
const dqcDisplay = 'DQC';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss']
})
export class ScatterPlotComponent implements OnInit {

  title = 'QC Call Rate vs DQC';
  data: any;
  samplesDetails = [{
    barcode: "5507934335443080918800",
    callRate: 98.80516,
    computedGender: "male",
    dishQc: 0.97708,
    name: "3074_(Axiom_PigGen01)_L03.CEL",
    position: "L03",
    qcCallRate: 99.06015,
    scanArrayHeight: 1948,
    scanArrayWidth: 1948,
    scanDate: "2017-05-12T01:06:58Z",
    state: "Pass"
  }];

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.fillData();
    this.buildPlot();
  }

  fillData() {
    this.data = [];
    this.samplesDetails.map(sample => {
      if (sample.qcCallRate && sample.dishQc) {
        this.data.push({
          x: sample.dishQc,
          y: sample.qcCallRate,
          label: sample.computedGender ? sample.computedGender : unknownGender,
          sample: sample.name
        });
      }
      return sample;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.buildPlot();
  }

  buildPlot() {
    const popupWidth = document.getElementsByClassName(popupId)[0].clientWidth;
    const visiblePopupWidth = d3.min([popupWidth, window.innerWidth]);
    const maxValue = visiblePopupWidth - popupMargin;
    const width = d3.max([maxValue, minPlotWidth]);

    // add the tooltip area to the webpage
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
    /*
    * value accessor - returns the value to encode for a given data object.
    * scale - maps value to a visual display encoding, such as a pixel position.
    * map function - maps from data value to display value
    * axis - sets up axis
    */

    // setup x
    const xValue = function (d) { return d.x; }, // data -> value
      xScale = d3.scaleLinear().range([0, width]), // value -> display
      xMap = function (d) { return xScale(xValue(d)); }, // data -> display
      xAxis = d3.axisBottom(xScale);

    // setup y
    const yValue = function (d) { return d.y; }, // data -> value
      yScale = d3.scaleLinear().range([defaultPlateHeight, 0]), // value -> display
      yMap = function (d) { return yScale(yValue(d)); }, // data -> display
      yAxis = d3.axisLeft(yScale);

    const cValue = function (d) { return d.label; },
      color = d3.scaleOrdinal()
        .domain([maleGender, femaleGender, unknownGender])
        .range([maleColor, femaleColor, unknownColor]);

    d3.select(container).select('svg').remove();
    // add the graph canvas to the body of the webpage
    const svg = d3.select(container).append('svg')
      .attr('width', width + defaultPlateMargin.left + defaultPlateMargin.right + 100)
      .attr('height', defaultPlateHeight + defaultPlateMargin.top + defaultPlateMargin.bottom)
      .append('g')
      .attr('transform', 'translate(' + defaultPlateMargin.left + ',' + defaultPlateMargin.top + ')');

    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(this.data, xValue) as any - 0.01, d3.min([d3.max(this.data, xValue) as any + 0.01, 1])]);
    yScale.domain([d3.min(this.data, yValue) as any - 1, d3.min([d3.max(this.data, yValue) as any + 1, 100])]);

    // x-axis
    let gX = svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + defaultPlateHeight + ')')
      .call(xAxis);
    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + 20)
      .attr('y', defaultPlateHeight + 50)
      .style('text-anchor', 'end')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text(dqcDisplay);

    // y-axis
    let gY = svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
    svg.append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', -70)
      .attr('x', - defaultPlateHeight / 2 + 50)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text(qcCallRateDisplay);

    //zoom
    let zoom = d3.zoom()
      .extent([[0, 0], [width, defaultPlateHeight]])
      .scaleExtent([1, 20])
      .translateExtent([[0, 0], [width, defaultPlateHeight]])
      .on('zoom', zoomed);

    let data = this.data;

    let rect = svg.append('rect')
      .attr('width', width)
      .attr('height', defaultPlateHeight)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .call(zoom)
      .on('dblclick', function (d) { resetted(); })
      .on('dblclick.zoom', null);

    // draw dots
    let points = svg.selectAll('.dot')
      .data(this.data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', 3.5)
      .attr('cx', xMap)
      .attr('cy', yMap)
      .style('stroke', 'black')
      .style('fill', function (d) { return color(cValue(d)).toString(); })
      .on('mouseover', function (d) {
        tooltip.style('display', null);
        tooltip.transition().duration(200).style('opacity', .9);
        const matrix = this.getScreenCTM().translate(+ this.getAttribute('cx'), + this.getAttribute('cy'));
        tooltip.html(d['sample'])
          .style('position', 'absolute')
          .style('background-color', 'white')
          .style('border', 'solid')
          .style('border-width', '1px')
          .style('border-radius', '5px')
          .style('padding', '10px')
          .style('display', 'block')
          .style('left', (window.pageXOffset + matrix.e + 15) + 'px')
          .style('top', (window.pageYOffset + matrix.f - 30) - 5 + 'px');
      })
      .on('mouseout', function (d) {
        tooltip.style('display', 'none');
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // draw legend
    const legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', function (d, i) { return 'translate(0,' + i * 20 + ')'; });

    // draw legend colored rectangles
    legend.append('rect')
      .attr('x', width + 82)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', function (d) { return color(d).toString(); });

    // draw legend text
    legend.append('text')
      .attr('x', width + 76)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(function (d) { return d; });

    function zoomed() {
      // create new scale ojects based on event
      let newXScale = d3.event.transform.rescaleX(xScale);
      let newYScale = d3.event.transform.rescaleY(yScale);
      // update axes
      gX.call(xAxis.scale(newXScale));
      gY.call(yAxis.scale(newYScale));
      points.data(data)
        .attr('cx', function (d) {
          let xPos = newXScale(xValue(d))
          if (xPos < 0 || xPos > width)
            return invisiblePositionConst;
          else
            return xPos;
        })
        .attr('cy', function (d) {
          let yPos = newYScale(yValue(d));
          if (yPos < 0 || yPos > defaultPlateHeight)
            return invisiblePositionConst;
          else
            return yPos;
        });
    }

    function resetted() {
      rect.call(zoom.transform, d3.zoomIdentity);
    }
  }
}
