import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import * as pages from '@pages';
import {NotFoundComponent} from '@components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: pages.IndexPageComponent
  },
  {
    path: 'pokemon/:id',
    component: pages.ViewPageComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRouting {
}
