import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule} from '@angular/core'
import { MaterializeModule } from 'angular2-materialize'
import { AppComponent } from './app.component'
import { ProductsComponent } from './app.products'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
