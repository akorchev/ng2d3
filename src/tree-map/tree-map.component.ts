import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import d3 from '../d3';
import { BaseChart } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';

@Component({
  selector: 'tree-map',
  template: `
    <chart
      [legend]="false"
      [view]="view">
      <svg:g [attr.transform]="transform" class="tree-map chart">
        <svg:g treeMapCellSeries
          [colors]="colors"
          [data]="data"
          [dims]="dims"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `
})
export class TreeMap extends BaseChart implements OnChanges {
  margin = [10, 10, 10, 10];

  @Input() view;
  @Input() results;
  @Input() scheme;
  @Input() customColors;

  @Output() clickHandler = new EventEmitter();

  dims: any;
  domain: any;
  transform: any;
  colors: any;
  treemap: any;
  data: any;

  ngOnChanges() {
    this.update();
  }

  update() {
    this.dims = calculateViewDimensions(this.view, this.margin, false, false, false, 12);
    this.domain = this.getDomain();

    this.treemap = d3.treemap()
      .size([this.dims.width, this.dims.height]);

    let rootNode = {
      name: 'root',
      value: 0,
      isRoot: true
    };

    let root = d3.stratify()
      .id(d => d.name)
      .parentId(d => { return d.isRoot ? null : 'root'; })
      ([rootNode, ...this.results])
      .sum(d => d.value);

    this.data = this.treemap(root);

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
  }

  getDomain() {
    return this.results.map(d => d.name);
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

}
