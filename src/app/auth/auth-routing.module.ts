import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent  , children:
      [
        { path: '', component: HomeComponent},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
