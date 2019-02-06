import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseitemsComponent }   from './baseitems/baseitems.component';
import { Baseitems1Component }   from './baseitems1/baseitems1.component';
import { DetailsUploadComponent }   from './details-upload/details-upload.component';
import { DirectuploadComponent }   from './directupload/directupload.component';

const routes: Routes = [
  { path: '', redirectTo: '/homeworks', pathMatch: 'full' },
  { path: 'homeworks',  component: DirectuploadComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'homeworks', component: HomeworksComponent,canActivate: [AuthGuard] },
  // { path: 'homeworks/:id', component: HomeworkDetailComponent,canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
