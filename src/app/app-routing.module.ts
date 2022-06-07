import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProgressComponent } from './progress/progress.component';
import { SearchBarComponent } from './Utility/search-bar/search-bar.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent },
  {
    path: 'search',
    component: SearchBarComponent,
  },
  {
    path: 'progress/:ritm',
    component: ProgressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
