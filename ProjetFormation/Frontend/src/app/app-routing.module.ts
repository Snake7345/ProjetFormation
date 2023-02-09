import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './categories/add-categories/add-categories.component';
import { AddFormationsComponent } from './formations/add-formations/add-formations.component';
import { AddQuestionsComponent } from './questions/add-questions/add-questions.component';
import { AddSyllabusComponent } from './syllabus/add-syllabus/add-syllabus.component';
import { AddUtilisateursComponent } from './utilisateurs/add-utilisateurs/add-utilisateurs.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FourofourComponent } from './shared/compos/fourofour/fourofour.component';
import { TableCategoriesComponent } from './categories/table-categories/table-categories.component';
import { TableFormationsComponent } from './formations/table-formations/table-formations.component';
import { TableQuestionsComponent } from './questions/table-questions/table-questions.component';
import { TableSyllabusComponent } from './syllabus/table-syllabus/table-syllabus.component';
import { TableUtilisateursComponent } from './utilisateurs/table-utilisateurs/table-utilisateurs.component';
import { UpdateCategoriesComponent } from './categories/update-categories/update-categories.component';
import { UpdateFormationsComponent } from './formations/update-formations/update-formations.component';
import { UpdateQuestionsComponent } from './questions/update-questions/update-questions.component';
import { UpdateSyllabusComponent } from './syllabus/update-syllabus/update-syllabus.component';
import { UpdateUtilisateursComponent } from './utilisateurs/update-utilisateurs/update-utilisateurs.component';
import {PresentationLaboComponent} from "./presentation-labo/presentation-labo.component";
import {WhereIsMoneyComponent} from "./where-is-money/where-is-money.component";
import {WhereIsMoneyGraphiqueComponent} from "./where-is-money-graphique/where-is-money-graphique.component";
import {OuSommesNousComponent} from "./ou-sommes-nous/ou-sommes-nous.component";
import {DepensesParPaysComponent} from "./depenses-par-pays/depenses-par-pays.component";

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
  { path: 'categories', component: TableCategoriesComponent},
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
  /*Routes pour le presentation-labo*/
  { path: 'presentation-labo', component: PresentationLaboComponent},
  { path: 'where-is-money', component: WhereIsMoneyComponent},
  { path: 'where-is-money-graphique', component: WhereIsMoneyGraphiqueComponent},
  { path: 'ou-sommes-nous', component: OuSommesNousComponent},
  { path: 'depenses-par-pays', component: DepensesParPaysComponent},
  /*Quand une route n'existe pas, la page redirige sur une erreur 404*/
  { path: '**', component: FourofourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
