import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss'],
})
export class AddCategoriesComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  denominationFormControl = new FormControl('', [Validators.required]);
}
