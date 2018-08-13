import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'


@Component({
  selector: 'products-list',
  template: `
  <table class="products-table">
   <thead>
     <tr class="products-head">
         <th>PRODUCT</th>
         <!--Product text spacer-->
         <th></th>
         <th>PRICE</th>
         <th>CODE</th>
         <th>CREATED BY</th>
         <th>LAST MODIFIED</th>
     </tr>
   </thead>
   <tbody>
     <tr class="products-row" *ngFor="let product of products">
       <td class="left-border product-img-td"><img class="product-img" src="assets/{{product.code}}.jpg"/></td>
       <td class="product-td"><span class="product-name">Parby Warker {{product.name}}</span></td>
       <td>{{product.price | currency}}</td>
       <td>{{product.code}}</td>
       <td>{{product.creator}}</td>
       <td class="right-border">{{product.last_modified * 1000 | date:'longDate'}}</td>
     </tr>
   </tbody>
 </table>`
})

export class ProductsComponent implements OnInit {
    products : any[]
    constructor(private http: HttpClient){}

    ngOnInit() {
      this.http.get('/api/v1/products').subscribe(response => this.products = response["products"])
    }

}
