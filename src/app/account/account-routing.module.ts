import { AccountComponent } from './account.component';
import { EditAuthInfosComponent } from './edit-auth-infos/edit-auth-infos.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AccountComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'edit-auth-infos', component: EditAuthInfosComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
