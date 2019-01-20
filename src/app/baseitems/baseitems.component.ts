import { Component, OnInit } from '@angular/core';
import { Baseitem } from '../apiservice/baseitem';
import { BaseitemsService } from '../apiservice/baseitem.service';

@Component({
  selector: 'app-baseitems',
  templateUrl: './baseitems.component.html',
  styleUrls: ['./baseitems.component.scss'],
  providers: [BaseitemsService]
})
export class BaseitemsComponent implements OnInit {

  constructor(private baseitemservice: BaseitemsService) { }
  baseitems: Array<Baseitem>;
  ngOnInit() {
    this.getBaseitems();
  }
 
  getBaseitems(): void {
    this.baseitemservice.getBaseitems()
    .subscribe(baseitems => this.baseitems = baseitems);
  }
  


  add(itemname: string,itemfile: string): void {
    // if (!category) { return; }
    this.baseitemservice.addBaseitem({ itemfile , itemname } as Baseitem)
      .subscribe(baseitem => {
        this.baseitems.push(baseitem);
      });
  }


}
