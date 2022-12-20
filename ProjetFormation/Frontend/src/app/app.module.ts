import { NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/compos/navbar/navbar.component';
import { FourofourComponent } from './shared/compos/fourofour/fourofour.component';
import { FooterComponent } from './shared/compos/footer/footer.component';
import { MenubarModule } from 'primeng/menubar';
import { HomepageComponent } from './homepage/homepage.component';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AddCategoriesComponent } from './add/add-categories/add-categories.component';
import { AddFormationsComponent } from './add/add-formations/add-formations.component';
import { AddUtilisateursComponent } from './add/add-utilisateurs/add-utilisateurs.component';
import { AddQuestionsComponent } from './add/add-questions/add-questions.component';
import { AddSyllabusComponent } from './add/add-syllabus/add-syllabus.component';
import { UpdateCategoriesComponent } from './update/update-categories/update-categories.component';
import { UpdateFormationsComponent } from './update/update-formations/update-formations.component';
import { UpdateQuestionsComponent } from './update/update-questions/update-questions.component';
import { UpdateSyllabusComponent } from './update/update-syllabus/update-syllabus.component';
import { UpdateUtilisateursComponent } from './update/update-utilisateurs/update-utilisateurs.component';
import { TableCategoriesComponent } from './table/table-categories/table-categories.component';
import { TableFormationsComponent } from './table/table-formations/table-formations.component';
import { TableQuestionsComponent } from './table/table-questions/table-questions.component';
import { TableSyllabusComponent } from './table/table-syllabus/table-syllabus.component';
import { TableUtilisateursComponent } from './table/table-utilisateurs/table-utilisateurs.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    PanelModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
