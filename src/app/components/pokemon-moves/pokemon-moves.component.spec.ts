import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonMovesComponent} from '@components';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BaseUrlInterceptor} from '@utils';
import {environment} from '../../../environments/environment';

describe('PokemonMovesComponent', () => {
  let component: PokemonMovesComponent;
  let fixture: ComponentFixture<PokemonMovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonMovesComponent],
      imports: [HttpClientModule, ToastrModule.forRoot({})],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
        {provide: 'BASE_API_URL', useValue: environment.apiUrl}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonMovesComponent);
    component = fixture.componentInstance;
    component.moves = [
      {
        move: {
          name: 'Move1',
          url: ''
        },
        version_group_details: []
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has moves', function () {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.moves')).not.toEqual(null);
  });
});
