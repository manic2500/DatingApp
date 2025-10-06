import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        const serverError = error.error;
        switch (error.status) {
          case 500:
            //toastr.error(serverError.message, "Server error")
            const navigationExtras: NavigationExtras = { state: { error: serverError } }
            router.navigateByUrl('/server-error', navigationExtras)
            break;
          case 401:
            toastr.error(serverError.message, "Un-Authorized")
            break;
          case 404:
            router.navigateByUrl('/not-found')
            //toastr.error(serverError.message, "Resource not found")
            break;
          case 400:
            if (serverError?.errors && typeof serverError.errors === 'object') {
              const validationErrors: string[] = [];

              for (const key in serverError.errors) {
                if (serverError.errors[key]) {
                  validationErrors.push(...serverError.errors[key]);
                }
              }
              throw validationErrors.flat();
            }
            else {
              toastr.error(serverError.message, 'Bad Request');
            }
            break;
          default:
            break;
        }
      }
      throw error
    })
  );
};


/* 
 if (error.status == 400) {
        const serverError = error.error;
        // 🧠 Check if it's a validation error (has 'errors' object)
        if (serverError?.errors && typeof serverError.errors === 'object') {
          const validationErrors: string[] = [];

          for (const key in serverError.errors) {
            if (serverError.errors[key]) {
              validationErrors.push(...serverError.errors[key]);
            }
          }

          // ✅ Option: Show validation errors using a toast or form binding
          //toastr.error('Validation Errors:', validationErrors.toString());

          return throwError(() => validationErrors);
        }

        // 👎 Custom bad request
        if (serverError?.message) {
          // Show message or handle as needed
          toastr.error(serverError.message, 'Bad Request');
          return throwError(() => serverError.message);
        }

        // Fallback
        toastr.error(serverError, 'Bad Request (400)');
        return throwError(() => 'Bad Request');

      }
      else {      
        toastr.error(error.error.message, "Error")
      }

*/