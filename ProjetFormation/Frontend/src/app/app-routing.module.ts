import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FourofourComponent } from './shared/compos/fourofour/fourofour.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: '**', component: FourofourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
