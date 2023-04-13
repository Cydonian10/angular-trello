import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { LoadingInterceptor } from '@/interceptops/loading.interceptor';
import { TokenInterceptor } from '@/interceptops/token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true,
    },
    {
      provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true
    },
    importProvidersFrom(BrowserModule, AppRoutingModule, HttpClientModule),
  ],
}).catch((err) => console.error(err));
