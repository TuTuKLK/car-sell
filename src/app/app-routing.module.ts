import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule) },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: "full" },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
