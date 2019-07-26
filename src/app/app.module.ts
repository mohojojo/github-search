import { BemModule } from 'angular-bem';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@shared/shared.module';

import { SearchEffects } from '@store/search/search.effects';
import { IssuesEffects } from './store/issues/issues.effects';

import { environment } from '@env/environment';
import { SearchReducer } from './store/search/search.reducer';
import { IssuesReducer } from './store/issues/issues.reducer';

import { IssuesListComponent } from './modules/search-list/components/issues-list/issues-list.component';

BemModule.config({
  separators: ['-', '_', ''],
  modCase: 'kebab',
  ignoreValues: false
});

const reducers = {
  search: SearchReducer,
  issues: IssuesReducer
};

const effects = [
  SearchEffects,
  IssuesEffects
];

@NgModule({
  declarations: [
    AppComponent,
    IssuesListComponent
  ],
  imports: [
    BemModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  bootstrap: [
    AppComponent,
  ],
  exports: [
  ],
  entryComponents: [IssuesListComponent]
})
export class AppModule { }

