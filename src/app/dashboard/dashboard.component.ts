import {Component, OnDestroy, OnInit} from '@angular/core';

interface Metric {
  used: number;
  available: number;
}

interface Node {
  name: string;
  cpu: Metric;
  mem: Metric;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  cpu: Metric;
  mem: Metric;
  cluster1: Node[];
  cluster2: Node[];
  interval: any;


  constructor() { }

  ngOnInit(): void{
    this.generateData();
    this.interval = setInterval(() => {
      this.generateData();
    }, 15000);
  }

  ngOnDestroy(): void{
    clearInterval(this.interval);
  }

  generateData(): void {
    this.cluster1 = [];
    this.cluster2 = []
    this.cpu = {used: 0, available:0};
    this.mem = {used: 0, available:0}
    for (let i = 1; i < 4; i++) this.cluster1.push(this.randomNode(i));
    for (let i = 4; i < 7; i++) this.cluster2.push(this.randomNode(i));

  }

  private randomNode(i: number): Node{
    const node = {
      name: 'Node' + i,
      cpu: {available: 16, used: this.randomInterger(0, 16) },
      mem: {available: 64, used: this.randomInterger(0, 64) }
    };
    this.cpu.used += node.cpu.used;
    this.cpu.available += node.cpu.available;
    this.mem.used += node.mem.used;
    this.mem.available += node.mem.available;
    return node;
  }

  private randomInterger(min: number = 0, max: number = 100): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;  // The maximum is inclusive and the minimum is inclusive
  }
}
