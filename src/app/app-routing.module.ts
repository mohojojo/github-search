import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LandingComponent } from './modules/landing/landing.component';
import { LandingModule } from './modules/landing/landing.module';

export const ROUTES: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  // {
  //   path: 'search',
  //   loadChildren: './modules/search/search.module#SearchModule'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES,
      {
        // enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: PreloadAllModules
      }),
      LandingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }