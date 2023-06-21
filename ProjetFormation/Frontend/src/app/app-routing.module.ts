import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './components/categories/add-categories/add-categories.component';
import { AddFormationsComponent } from './components/formations/add-formations/add-formations.component';
import { AddQuestionsComponent } from './components/questions/add-questions/add-questions.component';
import { AddSyllabusComponent } from './components/syllabus/add-syllabus/add-syllabus.component';
import { AddUtilisateursComponent } from './components/utilisateurs/add-utilisateurs/add-utilisateurs.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FourofourComponent } from './shared/compos/fourofour/fourofour.component';
import { TableCategoriesComponent } from './components/categories/table-categories/table-categories.component';
import { TableFormationsComponent } from './components/formations/table-formations/table-formations.component';
import { TableQuestionsComponent } from './components/questions/table-questions/table-questions.component';
import { TableSyllabusComponent } from './components/syllabus/table-syllabus/table-syllabus.component';
import { TableUtilisateursComponent } from './components/utilisateurs/table-utilisateurs/table-utilisateurs.component';
import { UpdateCategoriesComponent } from './components/categories/update-categories/update-categories.component';
import { UpdateFormationsComponent } from './components/formations/update-formations/update-formations.component';
import { UpdateQuestionsComponent } from './components/questions/update-questions/update-questions.component';
import { UpdateSyllabusComponent } from './components/syllabus/update-syllabus/update-syllabus.component';
import { UpdateUtilisateursComponent } from './components/utilisateurs/update-utilisateurs/update-utilisateurs.component';
import {PresentationLaboComponent} from "./components/presentation-labo/presentation-labo.component";
import {WhereIsMoneyComponent} from "./components/where-is-money/where-is-money.component";
import {WhereIsMoneyGraphiqueComponent} from "./components/where-is-money-graphique/where-is-money-graphique.component";
import {OuSommesNousComponent} from "./components/ou-sommes-nous/ou-sommes-nous.component";
import {DepensesParPaysComponent} from "./components/depenses-par-pays/depenses-par-pays.component";
import {ConnexionComponent} from "./components/connexion/connexion.component";
import {UpdateProfilComponent} from "./components/profil/update-profil/update-profil.component";
import {MesFormationsComponent} from "./components/formations/mes-formations/mes-formations.component";
import {MesDiplomesComponent} from "./components/diplomes/mes-diplomes/mes-diplomes.component";

const routes: Routes = [
  /*Routes de la navbar et des sous-formulaires*/
  { path: '', component: ConnexionComponent },
  /*Route add*/
  { path: 'homepage', component : HomepageComponent},
  { path: 'addCategories', component: AddCategoriesComponent},
  { path: 'addFormations', component: AddFormationsComponent},
  { path: 'addQuestions', component: AddQuestionsComponent},
  { path: 'addSyllabus', component: AddSyllabusComponent},
  { path: 'addUtilisateurs', component: AddUtilisateursComponent},
  /*Route tables*/
  { path: 'tableCategories', component: TableCategoriesComponent},
  { path: 'tableFormations', component: TableFormationsComponent},
  { path: 'tableQuestions', component: TableQuestionsComponent},
  { path: 'tableSyllabus/:id', component: TableSyllabusComponent},
  { path: 'tableUtilisateurs', component: TableUtilisateursComponent},
  /*Route updates*/
  { path: 'updateCategories/:id', component: UpdateCategoriesComponent},
  { path: 'updateFormations/:id', component: UpdateFormationsComponent},
  { path: 'updateQuestions/:id', component: UpdateQuestionsComponent},
  { path: 'updateSyllabus/:id', component: UpdateSyllabusComponent},
  { path: 'updateUtilisateurs/:id', component: UpdateUtilisateursComponent},
  /*Routes pour le presentation-labo*/
  { path: 'presentation-labo', component: PresentationLaboComponent},
  { path: 'where-is-money', component: WhereIsMoneyComponent},
  { path: 'where-is-money-graphique', component: WhereIsMoneyGraphiqueComponent},
  { path: 'ou-sommes-nous', component: OuSommesNousComponent},
  { path: 'depenses-par-pays', component: DepensesParPaysComponent},
  /*Routes autres*/
  { path: 'mon-profil', component: UpdateProfilComponent},
  { path: 'mes-formations', component: MesFormationsComponent},
  { path: 'mes-diplomes', component: MesDiplomesComponent},
  /*Quand une route n'existe pas, la page redirige sur une erreur 404*/
  { path: '**', component: FourofourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
