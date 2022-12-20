import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './add/add-categories/add-categories.component';
import { AddFormationsComponent } from './add/add-formations/add-formations.component';
import { AddQuestionsComponent } from './add/add-questions/add-questions.component';
import { AddSyllabusComponent } from './add/add-syllabus/add-syllabus.component';
import { AddUtilisateursComponent } from './add/add-utilisateurs/add-utilisateurs.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FourofourComponent } from './shared/compos/fourofour/fourofour.component';
import { TableCategoriesComponent } from './table/table-categories/table-categories.component';
import { TableFormationsComponent } from './table/table-formations/table-formations.component';
import { TableQuestionsComponent } from './table/table-questions/table-questions.component';
import { TableSyllabusComponent } from './table/table-syllabus/table-syllabus.component';
import { TableUtilisateursComponent } from './table/table-utilisateurs/table-utilisateurs.component';
import { UpdateCategoriesComponent } from './update/update-categories/update-categories.component';
import { UpdateFormationsComponent } from './update/update-formations/update-formations.component';
import { UpdateQuestionsComponent } from './update/update-questions/update-questions.component';
import { UpdateSyllabusComponent } from './update/update-syllabus/update-syllabus.component';
import { UpdateUtilisateursComponent } from './update/update-utilisateurs/update-utilisateurs.component';

const routes: Routes = [
  /*Routes de la navbar et des sous-formulaires*/
  { path: '', component: HomepageComponent },
  /*Route add*/
  { path: 'addCategories', component: AddCategoriesComponent},
  { path: 'addFormations', component: AddFormationsComponent},
  { path: 'addQuestions', component: AddQuestionsComponent},
  { path: 'addSyllabus', component: AddSyllabusComponent},
  { path: 'addUtilisateurs', component: AddUtilisateursComponent},
  /*Route tables*/
  { path: 'tableCategories', component: TableCategoriesComponent},
  { path: 'tableFormations', component: TableFormationsComponent},
  { path: 'tableQuestions', component: TableQuestionsComponent},
  { path: 'tableSyllabus', component: TableSyllabusComponent},
  { path: 'tableUtilisateurs', component: TableUtilisateursComponent},
  /*Route updates*/
  { path: 'updateCategories', component: UpdateCategoriesComponent},
  { path: 'updateFormations', component: UpdateFormationsComponent},
  { path: 'updateQuestions', component: UpdateQuestionsComponent},
  { path: 'updateSyllabus', component: UpdateSyllabusComponent},
  { path: 'updateUtilisateurs', component: UpdateUtilisateursComponent},

  /*Quand une route n'existe pas, la page redirige sur une erreur 404*/
  { path: '**', component: FourofourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
