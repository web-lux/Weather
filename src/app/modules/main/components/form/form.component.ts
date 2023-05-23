import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cityForm!: FormGroup;

  constructor (private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.cityForm = this.formBuilder.group({
      cityName: [null, [Validators.required]],
    })
  }
  onSubmitForm() {

  }
}
