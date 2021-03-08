import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HitosOneComponent } from './hitos.component';

describe('HitosComponent', () => {
  let component: HitosOneComponent;
  let fixture: ComponentFixture<HitosOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitosOneComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HitosOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
