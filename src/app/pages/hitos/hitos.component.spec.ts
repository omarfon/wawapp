import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HitosComponent } from './hitos.component';

describe('HitosComponent', () => {
  let component: HitosComponent;
  let fixture: ComponentFixture<HitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
