import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
      label: 'Categories',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Table des Catégories',
          icon: 'pi pi-fw pi-plus',
          //routerLink : ''
        },
        {
          label: 'Ajouter une catégorie',
          icon: 'pi pi-fw pi-trash',
        },
      ],
    },
    {
      label: 'Formations',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {
          label: 'Table des formations',
          icon: 'pi pi-fw pi-align-left',
        },
        {
          label: 'Ajouter une formation',
          icon: 'pi pi-fw pi-align-right',
        },
      ],
    },
    {
      label: 'Questions',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Table des questions',
          icon: 'pi pi-fw pi-user-plus',
        },
        {
          label: 'Ajouter une question',
          icon: 'pi pi-fw pi-user-minus',
        },
      ],
    },
    {
      label: 'Utilisateurs',
      icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Table des utilisateurs',
          icon: 'pi pi-fw pi-pencil',
        },
        {
          label: 'Ajouter un utilisateur',
          icon: 'pi pi-fw pi-pencil',
        },
        {
          label: 'Modifier votre profil',
          icon: 'pi pi-fw pi-pencil',
        },
      ],
    },
    {
      label: 'Syllabus',
      icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Table des Syllabus',
          icon: 'pi pi-fw pi-pencil',
        },
        {
          label: 'Ajouter un syllabus',
          icon: 'pi pi-fw pi-pencil',
        },
      ],
    },
  ];
}
