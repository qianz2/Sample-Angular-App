import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule} from '@angular/core'
import { MaterializeModule } from 'angular2-materialize'
import { AppComponent } from './app.component'
import { ProductsComponent } from './app.products'


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
