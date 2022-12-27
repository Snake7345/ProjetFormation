import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-formations',
  templateUrl: './add-formations.component.html',
  styleUrls: ['./add-formations.component.scss'],
})
export class AddFormationsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  nomFormControl = new FormControl('', [Validators.required]);
  infosFormControl = new FormControl('');
  dateLimiteInscriptionFormControl = new FormControl('', [Validators.required]);
  dateQuestionnaireFormControl = new FormControl('', [Validators.required]);
}
