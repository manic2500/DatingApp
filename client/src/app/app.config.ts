import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr, ToastNoAnimation } from 'ngx-toastr';
import { InitService } from '../core/services/init-service';
import { loadingInterceptor } from '../core/interceptors/loading-interceptor';
import { errorInterceptor } from '../core/interceptors/error-interceptor';
//import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withInterceptors([loadingInterceptor, errorInterceptor])
    ),
    //provideAnimations(), // required animations providers   
    provideToastr({ toastComponent: ToastNoAnimation }), // Toastr providers
    provideAppInitializer(() => {
      const initService = inject(InitService);
      initService.initApp();
    })
  ]

};
