import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerComponent } from './Ver.component';

describe('VerComponent', () => {
  let component: VerComponent;
  let fixture: ComponentFixture<VerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
