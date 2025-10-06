import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading-service';
import { finalize } from 'rxjs';


export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  let showTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let spinnerVisible = false;

  // Start timer: delay showing the spinner (e.g., 200ms)
  showTimeoutId = setTimeout(() => {
    loadingService.show();
    spinnerVisible = true;
  }, 200); // 👈 Adjust this delay as needed

  return next(req).pipe(
    finalize(() => {
      // Cancel the timer if still pending
      if (showTimeoutId) {
        clearTimeout(showTimeoutId);
        showTimeoutId = null;
      }

      // Only hide if it was actually shown
      if (spinnerVisible) {
        loadingService.hide();
      }
    })
  );
};

/* export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService)
  loadingService.show();
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
 */