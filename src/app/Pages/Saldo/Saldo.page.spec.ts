import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaldoPage } from './Saldo.page';

describe('SaldoPage', () => {
  let component: SaldoPage;
  let fixture: ComponentFixture<SaldoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaldoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
