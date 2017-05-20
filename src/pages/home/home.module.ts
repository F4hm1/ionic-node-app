import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicModule.forRoot(HomePage),
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule {}
