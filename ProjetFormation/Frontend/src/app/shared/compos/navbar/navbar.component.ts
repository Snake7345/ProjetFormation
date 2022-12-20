import { Component} from '@angular/core';
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
      icon: 'pi pi-fw pi-sliders-h',
      items: [
        {
          label: 'Table des Catégories',
          icon: 'pi pi-fw pi-bars ',
          //routerLink : ''
        },
        {
          label: 'Ajouter une catégorie',
          icon: 'pi pi-fw pi-plus',
        },
      ],
    },
    {
      label: 'Formations',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Table des formations',
          icon: 'pi pi-fw pi-bars',
        },
        {
          label: 'Ajouter une formation',
          icon: 'pi pi-fw pi-plus',
        },
      ],
    },
    {
      label: 'Utilisateurs',
      icon: 'pi pi-fw pi-users',
      items: [
        {
          label: 'Table des utilisateurs',
          icon: 'pi pi-fw pi-bars',
        },
        {
          label: 'Ajouter un utilisateur',
          icon: 'pi pi-fw pi-user-plus',
        },
        {
          label: 'Modifier votre profil',
          icon: 'pi pi-fw pi-pencil',
        },
      ],
    },
  ];
}
