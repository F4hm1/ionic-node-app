import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProfilePage } from './profile';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicModule.forRoot(ProfilePage),
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfileModule {}
