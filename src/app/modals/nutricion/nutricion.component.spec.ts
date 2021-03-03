import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NutricionComponent } from './nutricion.component';

describe('NutricionComponent', () => {
  let component: NutricionComponent;
  let fixture: ComponentFixture<NutricionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutricionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NutricionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
