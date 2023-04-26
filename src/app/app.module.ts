import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

import {AppRouting} from './app.routing';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {BaseUrlInterceptor} from '@utils';
import * as pages from '@pages';
import * as components from '@components';
import {NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NotFoundComponent} from './components/system/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    pages.IndexPageComponent,
    components.PokemonCardComponent,
    pages.ViewPageComponent,
    components.NavbarComponent,
    components.PokemonSpritesComponent,
    components.PokemonMovesComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRouting,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    NgOptimizedImage,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: 'BASE_API_URL', useValue: environment.apiUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
