import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './Tabs.component.html',
  styleUrls: ['./Tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor() { }

  @Input("ActiveTab") ActiveTab: string; 

  ngOnInit() {}

}
