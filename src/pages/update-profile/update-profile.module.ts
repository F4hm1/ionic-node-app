import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { UpdateProfile } from './update-profile';

@NgModule({
  declarations: [
    UpdateProfile,
  ],
  imports: [
    IonicModule.forRoot(UpdateProfile),
  ],
  exports: [
    UpdateProfile
  ]
})
export class UpdateProfileModule {}
