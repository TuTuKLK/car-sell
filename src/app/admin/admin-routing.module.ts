import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';;

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/:id', component: DashboardComponent },
    { path: '', redirectTo: 'dashboard',pathMatch: "full" },
    { path: '**', redirectTo: 'dashboard' },


]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class AdminRoutingModule { }