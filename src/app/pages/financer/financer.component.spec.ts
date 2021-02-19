import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinancerComponent } from './financer.component';

describe('FinancerComponent', () => {
  let component: FinancerComponent;
  let fixture: ComponentFixture<FinancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
