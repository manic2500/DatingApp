// base-api.service.ts
import { ToastrService } from 'ngx-toastr';

export class BaseApiService {
    constructor(protected toastr: ToastrService) { }

    protected baseUrl = 'https://localhost:5001/api';
    public handleSubscription<T>(
        onSuccess: (value: T) => void,
        onError: (error: any) => void = (error) => {
            console.error(error);
            this.toastr.error(error.error);
        },
        onComplete: () => void = () => console.log('Completed')
    ) {
        return {
            next: onSuccess,
            error: onError,
            complete: onComplete
        };
    }
}
