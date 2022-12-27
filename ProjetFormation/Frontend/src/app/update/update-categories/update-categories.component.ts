import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss'],
})
export class UpdateCategoriesComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  denominationFormControl = new FormControl('', [Validators.required]);
}
