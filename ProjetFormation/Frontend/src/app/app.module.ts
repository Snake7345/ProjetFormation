/*----------------Modules principaux-------------------------------------------------------------------*/
import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/compos/navbar/navbar.component';
import { FourofourComponent } from './shared/compos/fourofour/fourofour.component';
import { FooterComponent } from './shared/compos/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddCategoriesComponent } from './categories/add-categories/add-categories.component';
import { AddFormationsComponent } from './formations/add-formations/add-formations.component';
import { AddUtilisateursComponent } from './utilisateurs/add-utilisateurs/add-utilisateurs.component';
import { AddQuestionsComponent } from './questions/add-questions/add-questions.component';
import { AddSyllabusComponent } from './syllabus/add-syllabus/add-syllabus.component';
import { UpdateCategoriesComponent } from './categories/update-categories/update-categories.component';
import { UpdateFormationsComponent } from './formations/update-formations/update-formations.component';
import { UpdateQuestionsComponent } from './questions/update-questions/update-questions.component';
import { UpdateSyllabusComponent } from './syllabus/update-syllabus/update-syllabus.component';
import { UpdateUtilisateursComponent } from './utilisateurs/update-utilisateurs/update-utilisateurs.component';
import { TableCategoriesComponent } from './categories/table-categories/table-categories.component';
import { TableFormationsComponent } from './formations/table-formations/table-formations.component';
import { TableQuestionsComponent } from './questions/table-questions/table-questions.component';
import { TableSyllabusComponent } from './syllabus/table-syllabus/table-syllabus.component';
import { TableUtilisateursComponent } from './utilisateurs/table-utilisateurs/table-utilisateurs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*-------------------------------------Module Angular Material------------------------------------------*/
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { PresentationLaboComponent } from './presentation-labo/presentation-labo.component';
import { WhereIsMoneyComponent } from './where-is-money/where-is-money.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { WhereIsMoneyGraphiqueComponent } from './where-is-money-graphique/where-is-money-graphique.component';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { OuSommesNousComponent } from './ou-sommes-nous/ou-sommes-nous.component';
import { DepensesParPaysComponent } from './depenses-par-pays/depenses-par-pays.component';
import {CommonModule} from "@angular/common";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ConnexionComponent } from './connexion/connexion.component';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FourofourComponent,
    FooterComponent,
    HomepageComponent,
    AddCategoriesComponent,
    AddFormationsComponent,
    AddUtilisateursComponent,
    AddQuestionsComponent,
    AddSyllabusComponent,
    UpdateCategoriesComponent,
    UpdateFormationsComponent,
    UpdateQuestionsComponent,
    UpdateSyllabusComponent,
    UpdateUtilisateursComponent,
    TableCategoriesComponent,
    TableFormationsComponent,
    TableQuestionsComponent,
    TableSyllabusComponent,
    TableUtilisateursComponent,
    PresentationLaboComponent,
    WhereIsMoneyComponent,
    WhereIsMoneyGraphiqueComponent,
    OuSommesNousComponent,
    DepensesParPaysComponent,
    ConnexionComponent,
  ],
  imports: [
    /*Modules principaux*/
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    /*Module Angular Material*/
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    /*Autres modules*/
    ToastrModule.forRoot(),
    RouterModule,
    HttpClientModule,
    NgxChartsModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,

  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },],
  bootstrap: [AppComponent],
})
export class AppModule {}
