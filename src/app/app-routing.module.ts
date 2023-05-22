import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RowColComponent } from './row-col/row-col.component';

const routes: Routes = [
  {path:'', redirectTo: 'rowcol', pathMatch:'full'},
  {path:'rowcol', component: RowColComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
