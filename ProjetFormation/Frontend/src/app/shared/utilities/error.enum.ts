export enum ErrorTypeCategorie{
  CATEGORIE_DENOMINATION_EMPTY = "La dénomination de la catégorie est requise.",
  CATEGORIE_LENGTH = "La longueur doit être entre 2 et 100 caractères."
}
export enum ErrorTypeUtilisateur
{
  UTILISATEUR_MAIL_EMPTY = "Le mail est requis",
  UTILISATEUR_MAIL_FORMAT = "Le format du mail ne correspond pas",
  UTILISATEUR_MAIL_LENGTH ="La longueur doit être entre 4 et 100 caractères",
  UTILISATEUR_SEXE_EMPTY ="Le sexe est requis",
  UTILISATEUR_NOM_EMPTY ="Le nom de l\'utilisateur est requis",
  UTILISATEUR_NOM_LENGTH ="La longueur doit être entre 2 et 100 caractères",
  UTILISATEUR_NOM_FORMAT ="Pas de caractères spéciaux (sauf le -) ni chiffres",
  UTILISATEUR_PRENOM_FORMAT ="Pas de caractères spéciaux (sauf le -) ni chiffres",
  UTILISATEUR_PRENOM_EMPTY ="Le prénom de l\'utilisateur est requis",
  UTILISATEUR_PRENOM_LENGTH = "La longueur doit être entre 2 et 100 caractères",
  UTILISATEUR_PASSWORD_LENGTH ="La longueur doit être entre 2 et 100 caractères",
  UTILISATEUR_PASSWORD_EMPTY = "Le password est requis",
  UTILISATEUR_NRN_EMPTY ="Le registre national est requis",
  UTILISATEUR_NRN_FORMAT= "Le registre national doit contenir que des chiffres",
  UTILISATEUR_NRN_LENGTH ="La longueur doit être de 11 caractères",
  UTILISATEUR_ROLE_EMPTY ="Le role de l'utilisateur est requis"
}
export enum ErrorTypeFormation
{
  FORMATION_CATEGORIE_EMPTY ="La categorie de la formation est requise",
  FORMATION_UTILISATEUR_EMPTY ="Le responsable de la formation est requis",
  FORMATION_DATEHEUREQUESTIONNAIRE_EMPTY = "La date et l\'heure du questionnaire est requis",
  FORMATION_DATEHEUREINSCRIPTION_EMPTY = "La date et l\'heure de l'inscription est requis",
  FORMATION_NOM_EMPTY = "Le nom de la formation est requis",
  FORMATION_NOM_LENGTH = "La longueur doit être entre 2 et 150 caractères",
  FORMATION_INFOS_LENGTH ="les infos sont limités à 1000 caractères",
  FORMATION_QUESTIONNAIRE_BEFORE_INSCRIPTION = "La date du questionnaire est antérieure à la date d\'inscription"
}
