import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuidadobebeComponent } from './cuidadobebe.component';

describe('CuidadobebeComponent', () => {
  let component: CuidadobebeComponent;
  let fixture: ComponentFixture<CuidadobebeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuidadobebeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuidadobebeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
