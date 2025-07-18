import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { HomeComponent } from './components/home-component/home-component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login-component/login-component';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [App, Header, Footer, HomeComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
  ],
  bootstrap: [App],
})
export class AppModule {}
