import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseitemsComponent }   from './baseitems/baseitems.component';
const routes: Routes = [
  { path: '', redirectTo: '/homeworks', pathMatch: 'full' },
  { path: 'homeworks',  component: BaseitemsComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'homeworks', component: HomeworksComponent,canActivate: [AuthGuard] },
  // { path: 'homeworks/:id', component: HomeworkDetailComponent,canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
