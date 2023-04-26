import {TestBed} from '@angular/core/testing';
import {BaseUrlInterceptor} from '@utils';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {environment} from '../../../environments/environment';

describe('BaseUrlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, ToastrModule.forRoot({})],
    providers: [
      BaseUrlInterceptor,
      {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
      {provide: 'BASE_API_URL', useValue: environment.apiUrl}
    ]
  }));

  it('should be created', () => {
    const interceptor: BaseUrlInterceptor = TestBed.inject(BaseUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
