import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiscitasComponent } from './miscitas.component';

describe('MiscitasComponent', () => {
  let component: MiscitasComponent;
  let fixture: ComponentFixture<MiscitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscitasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiscitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
