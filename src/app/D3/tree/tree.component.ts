import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import * as d3 from 'd3';
import { DataService } from 'src/app/Shared/data.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {
  loaded: boolean = false;

  constructor(private dataService: DataService) {}

  @ViewChild('chart', { static: true })
  private chartContainer: ElementRef | null = null;

  @Input() RITM: string = '';
  @Output() nodeInfo = new EventEmitter();

  data: any;
  svg: any;
  zoom: any;
  i = 0;
  duration = 750;
  root: any;
  treemap: any;
  node: any;

  margin = {
    top: 20,
    right: 90,
    bottom: 20,
    left: 90,
  };
  width = 1650 - this.margin.left - this.margin.right;
  height = 600 - this.margin.top - this.margin.bottom;

  ngOnInit() {
    this.dataService.dataResults(this.RITM).then((data) => {
      console.log(data);
      this.data = data;
      this.loaded = true;
      this.renderSVG();
    });
  }

  renderSVG() {
    console.log('render complete');
    this.treemap = d3.tree().size([this.height, this.width]);
    this.zoom = d3.zoom().on('zoom', this.handleZoom);
    d3.select('svg').remove();
    this.svg = d3
      .select(this.chartContainer?.nativeElement)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
    d3.select(this.chartContainer?.nativeElement).call(this.zoom);
    this.root = d3.hierarchy(this.data, (d) => d['children']);
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;
    console.log(this.root);

    this.update(this.root);
  }

  handleZoom(e: any) {
    d3.select('g').attr('transform', e.transform);
  }

  onResetZoom() {
    d3.select(this.chartContainer?.nativeElement)
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
    let transpose = d3.transpose<number>([
      [1, 2, 3],
      [1, 2, 4],
    ]);
    console.log(transpose);
  }

  diagonal(s: any, d: any) {
    let path = `M ${s.y} ${s.x}
    C ${(s.y + d.y) / 2} ${s.x}
      ${(s.y + d.y) / 2} ${d.x}
      ${d.y} ${d.x}`;
    return path;
  }

  modalClick() {
    this.nodeInfo.emit(true);
  }

  click(event: any, d: any) {
    console.log('Click');
    if (event.type == 'click') {
      if (d['children']) {
        d['_children'] = d['children'];
        d['children'] = null;
      } else {
        d['children'] = d['_children'];
        d['_children'] = null;
      }
      this.update(d);
    } else if (event.type == 'contextmenu') {
      console.log(d);
      this.nodeInfo.emit(d);
      event.preventDefault();
    }
  }

  update(source: any) {
    var treeData = this.treemap(this.root);
    //nodes

    let nodes = treeData.descendants();
    // nodes.forEach((d: any) => {
    //   d.y = d.depth * 100;
    // });

    this.node = this.svg
      .selectAll('g.node')
      .data(nodes, (d: any) => d['id'] || (d['id'] = ++this.i));
    let nodeEnter = this.node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr(
        'transform',
        (d: any) => 'translate(' + source.y0 + ',' + source.x0 + ')'
      )
      .on('contextmenu', (event: any, d: any) => {
        return this.click(event, d);
      })
      .on('click', (event: any, d: any) => {
        return this.click(event, d);
      });

    nodeEnter.append('circle').attr('class', 'node').attr('r', 25);

    nodeEnter
      .append('text')
      .attr('dy', '3em')
      // .attr('x', (d: any) => (d['children'] || d['_children'] ? -13 : 13))
      .attr('x', (d: any) => {
        return d['children'] || d['_children']
          ? -((d.data.name as string).length * 3)
          : -((d.data.name as string).length * 3);
      })

      .text((d: any) => d.data.name);

    let nodeUpdate = nodeEnter.merge(this.node);
    nodeUpdate
      .transition()
      .duration(this.duration)
      .attr('transform', (d: any) => 'translate(' + d.y + ',' + d.x + ')');

    nodeUpdate
      .select('circle.node')
      .attr('class', (d: any) =>
        d.data.state == 'completed'
          ? 'indicate-green'
          : d.data.state == 'active'
          ? 'indicate-yellow'
          : 'indicate-red'
      )
      .attr('cursor', 'pointer');

    let nodeExit = this.node
      .exit()
      .transition()
      .duration(this.duration)
      .attr(
        'transform',
        (d: any) => 'translate(' + source.y + ',' + source.x + ')'
      )
      .remove();

    nodeExit.select('circle').attr('r', 0);
    nodeExit.select('text').style('fill-opacity', 0);
    let links = treeData.descendants().slice(1);
    let link: any = this.svg
      .selectAll('path.link')
      .data(links, (d: any) => d['id']);
    let linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', (d: any) => {
        return d.data.state == 'completed'
          ? 'link-green link'
          : d.data.state == 'active'
          ? 'link-yellow link'
          : 'link-red link';
      })

      .attr('d', (d: any) => {
        let o = { x: source.x0, y: source.y0 };
        return this.diagonal(o, o);
      });
    let linkUpdate = linkEnter.merge(link);
    linkUpdate
      .transition()
      .duration(this.duration)
      .attr('d', (d: any) => this.diagonal(d, d.parent));

    let linkExit = link
      .exit()
      .transition()
      .duration(this.duration)
      .attr('d', (d: any) => {
        let o = { x: source.x0, y: source.y0 };
        return this.diagonal(o, o);
      })
      .remove();
    linkExit.select('link').style('stroke-width', 0);
    nodes.forEach((d: any) => {
      d['x0'] = d.x;
      d['y0'] = d.y;
    });
  }
}
