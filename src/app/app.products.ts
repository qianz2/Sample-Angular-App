import { HttpClient } from '@angular/common/http'
import { Component, OnInit, EventEmitter } from '@angular/core'
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'products-list',
  template: `
  // template goes here
  `

})

export class ProductsComponent implements OnInit {
    products : any[]

    //Dictionary to let us grab and update prices without iterating over products array
    //Structure should be id : price
    productPrices : any = {}

    //This variable tracks product id for delete confirmation
    //If we split modals into another service this would be cleaner, but for this scale this is acceptable imo
    modalDelete : number
    constructor(private http: HttpClient){}

    //Basic get request for our list of products
    ngOnInit() {
      this.http.get('/api/v1/products').subscribe(response => {
        this.products = response["products"]
        this.initializePriceTable(this.products)
      })
    }

    //Helper function to initialize our price dictionary
    initializePriceTable(productsInit){
      productsInit.forEach(product => {
        this.productPrices[product.id] = product.price
      })
    }

    //Two way binding wasn't properly working, so we use one way binding and track model changes via productPrices
    //Still not ideal, but better solution than sendPriceFromDom
    onChange(newValue, id){
      console.log(newValue)
      //This is still quick and dirty reformatting
      //This will be locale dependent to US currency formats
      //Also needs a truncate for decimal overflow, but for this scale of app it's good enough
      this.productPrices[id] = parseFloat(newValue.replace(/[^0-9.]/g, ''))
      console.log(this.productPrices[id])
    }

    //This is pretty hackerish and doesn't fully utilize what we could with ngModel
    //But for an app of this scale, it works for what we want to do and was fast to implement.
    sendPriceFromDom(id) {
      console.log(id)
      let price = (<HTMLInputElement>document.getElementById(id)).value;
      console.log(price)

      //We're being hackerish, so we do some quick and dirty reformatting
      let numericPrice = price.replace(/[^0-9.]/g, '')
      //Above would never be acceptable in a production application, should really use ngModel
      console.log(numericPrice)
      console.log('/api/v1/products/' + id + '?price=' + numericPrice)
      //this.http.put('/api/v1/products/' + id + '?price=' + numericPrice)
    }

    //This is a little better since we can do our reformatting at change level
    //In a production app, we could do better, but this lets us hook into the ngModel change event to do additional validation
    sendPriceFromPriceObject(id) {
      console.log(id)
      let numericPrice = this.productPrices[id]
      let queryString = encodeURI('/api/v1/products/' + id + '?price=' + numericPrice)
      console.log(queryString)

      //TODO: This should have some minor error handling on it
      this.http.put('/api/v1/products/' + id + '/price?price=' + numericPrice, null).subscribe( value => {
      console.log(value)
        for(var product in this.products) {
          if(this.products[product]["id"] == value["id"]) {
            this.products[product]["price"] = value["price"]
            this.productPrices[value["id"]] = value["price"]
          }
        }
      })
    }

    //This function deletes id at modalDelete
    deleteProduct() {
      let id = this.modalDelete
      console.log("/api/v1/products/" + id)
      if(id){
        this.http.delete('/api/v1/products/' + id).subscribe(success => {
          console.log("Success Received")
          //splice the deleted product out of our list of products
          for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
              this.products.splice(i,1)
              break;
            }
          }
          console.log(this.products)
          this.modalDelete = 0
        })
      }
    }


    //MATERIAL MODAL ACTIONS
    modalActions = new EventEmitter<string|MaterializeAction>();
    openModal(id) {
      this.modalDelete = id
      this.modalActions.emit({action:"modal",params:['open']});
    }
    closeModal() {
      this.modalActions.emit({action:"modal",params:['close']});
      this.modalDelete = 0
    }

}
