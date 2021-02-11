import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MydatesComponent } from './mydates.component';

describe('MydatesComponent', () => {
  let component: MydatesComponent;
  let fixture: ComponentFixture<MydatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydatesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MydatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
