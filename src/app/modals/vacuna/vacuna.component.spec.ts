import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VacunaComponent } from './vacuna.component';

describe('VacunaComponent', () => {
  let component: VacunaComponent;
  let fixture: ComponentFixture<VacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
