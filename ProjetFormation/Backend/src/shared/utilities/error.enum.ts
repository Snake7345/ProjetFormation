export enum ErrorTypeCategories{
    CATEGORIE_NOM_ERROR = "Le nom de la catégorie doit être une chaine de caractère",
    CATEGORIE_NOM_LENGTH = "Le nom de la catégorie doit être compris entre 2 et 100 caractères",
    CATEGORIE_NOT_EXIST = "Cette catégorie n'existe pas",
    CATEGORIE_EXIST = "Cette catégorie existe déjà",
    CATEGORIE_NOM_EXIST = "Le nom de la catégorie existe déjà",
    CATEGORIE_EMPTY_NOM_ERROR = "Le nom de la catégorie ne peut pas être vide",
    CATEGORIE_PROBLEM = "Problème concernant la désactivation/activation de la catégorie"
}

export enum ErrorTypeDiplomes
{
    DIPLOME_NOM_ERROR = "Le nom du diplôme doit être une chaine de caractère",
    DIPLOME_NOM_LENGTH = "Le nom du diplôme doit être compris entre 2 et 150 caractères",
    DIPLOME_EMPTY_NOM_ERROR = "Le nom du diplôme ne peut pas être vide",
    DIPLOME_NOT_EXIST = "Le diplôme n'existe pas"
}

export enum ErrorTypeFormations
{
    FORMATION_NOT_EXIST = "La formation n'existe pas",
    FORMATION_NOM_ERROR = "Le nom de la formation doit être une chaine de caractère",
    FORMATION_NOM_LENGTH = "Le nom de la formation doit être compris entre 2 et 150 caractères",
    FORMATION_INFOS_ERROR = "Les infos de la formation doit être une chaine de caractère",
    FORMATION_INFOS_LENGTH = "Les infos de la formation doit être compris entre 2 et 150 caractères",
    FORMATION_DATE_INSCRIPTION_LIMIT_ERROR = "La date d'inscription n'est pas dans un format correcte",
    FORMATION_DATE_QUESTIONNAIRE_ERROR = "La date du questionnaire n'est pas dans un format correcte",
    FORMATION_HEURE_QUESTIONNAIRE_ERROR = "L'heure du questionnaire n'est pas dans un format correcte",
    FORMATION_HEURE_INSCRIPTION_LIMIT_ERROR = "L'heure limite de l'inscription n'est pas dans un format correcte",
    FORMATION_EMPTY_NOM_ERROR = "Le nom de la formation ne peut pas être vide",
    FORMATION_EMPTY_INFOS_ERROR = "Les infos de la formation ne peut pas être vide",
    FORMATION_EMPTY_DATE_INSCRIPTION_LIMIT_ERROR = "La date limite d'inscription est vide",
    FORMATION_EMPTY_DATE_QUESTIONNAIRE_ERROR = "La date du questionnaire est vide",
    FORMATION_EMPTY_HEURE_QUESTIONNAIRE_ERROR = "L'heure du questionnaire est vide",
    FORMATION_EMPTY_HEURE_LIMIT_INSCRIPTION_ERROR = "L'heure limite de l'inscription est vide",
    FORMATION_DATE_INSCRIPTION_AFTER_QUESTIONNAIRE_ERROR = "La date limite d'inscription ne doit pas être ultérieure à la date du questionnaire"

}

export enum ErrorTypePermissions
{
    PERMISSION_TYPE_ERROR = "le type de la permission doit être une chaîne de caractère",
    PERMISSION_TYPE_LENGTH = "Le type de la permission doit être compris entre 2 et 150 caractères",
    PERMISSION_ACTION_LENGTH = "L'action de la permission doit être compris entre 2 et 150 caractères",
    PERMISSION_ACTION_ERROR = "l'action de la permission doit être une chaîne de caractère",
    PERMISSION_EMPTY_TYPE_ERROR = "Le type de la permission ne doit pas être vide.",
    PERMISSION_EMPTY_ACTION_ERROR = "L'action de la permission ne doit pas être vide.",
    PERMISSION_NOT_EXIST = "La permission n'existe pas"
}

export enum ErrorTypeQuestions
{
    QUESTION_COTE_EMPTY_ERROR = "La cote de la question ne peut pas être vide"
}
export enum ErrorTypeReponses
{

}

export enum ErrorTypeRoles
{
    ROLE_NOT_EXIST = "Le role n'existe pas",
    ROLE_EXIST = "Le role existe déjà",
}
export enum ErrorTypeSyllabus
{
    SYLLABUS_NOT_EXIST = "Le syllabus n'existe pas",
    SYLLABUS_PROBLEM = "Problème concernant la désactivation/activation du syllabus"
}

export enum ErrorTypeUtilisateurs
{
    UTILISATEUR_NOT_FOUND = "l'utilisateur n'existe pas",
    UTILISATEUR_TYPE_LENGTH = "Le type de la permission doit être compris entre 2 et 150 caractères",
    UTILISATEUR_ACTION_LENGTH = "L'action de la permission doit être compris entre 2 et 150 caractères",
    UTILISATEUR_ACTION_ERROR = "l'action de la permission doit être une chaîne de caractère",
    UTILISATEUR_EMPTY_TYPE_ERROR = "Le type de la permission ne doit pas être vide.",
    UTILISATEUR_EMPTY_ACTION_ERROR = "L'action de la permission ne doit pas être vide.",
    UTILISATEUR_PASS_AND_MAIL_ERROR = "l'adresse mail et/ou le mot de passe est incorrecte",
    UTILISATEUR_MAIL_NOT_EXIST = "L'adresse mail n'existe pas",
    UTILISATEUR_NRN_EXIST = "Le NRN existe déjà, veuillez en choisir un autre",
    UTILISATEUR_MAIL_EXIST = "L'adresse mail existe déjà, veuillez en choisir un autre"
}


export enum ErrorGeneral{
    ERROR_UNKNOW ="erreur inconnue du système"
}

export enum ErrorStatus{
    ERROR_404 = 404,
    ERROR_500 = 500,
    ERROR_200 = 200,

}





