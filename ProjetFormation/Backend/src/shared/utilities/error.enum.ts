export enum ErrorTypeCategories{
    NOM_ERROR = "Le nom de la catégorie doit être une chaine de caractère",
    NOM_LENGTH = "Le nom de la catégorie doit être compris entre 2 et 100 caractères",
    CATEGORIE_NOT_EXIST = "Cette catégorie n'existe pas",
    CATEGORIE_EXIST = "Cette catégorie existe déjà",
    NOM_EXIST = "Le nom de la catégorie existe déjà",
    EMPTY_NOM_ERROR = "Le nom de la catégorie ne peut pas être vide",
}

export enum ErrorTypeDiplomes
{
    NOM_ERROR = "Le nom du diplôme doit être une chaine de caractère",
    NOM_LENGTH = "Le nom du diplôme doit être compris entre 2 et 150 caractères",
    EMPTY_NOM_ERROR = "Le nom du diplôme ne peut pas être vide",
}

export enum ErrorTypeFormations
{
    NOM_ERROR = "Le nom de la formation doit être une chaine de caractère",
    NOM_LENGTH = "Le nom de la formation doit être compris entre 2 et 150 caractères",
    INFOS_ERROR = "Les infos de la formation doit être une chaine de caractère",
    INFOS_LENGTH = "Les infos de la formation doit être compris entre 2 et 150 caractères",
    DATE_INSCRIPTION_LIMIT_ERROR = "La date d'inscription n'est pas dans un format correcte",
    DATE_QUESTIONNAIRE_ERROR = "La date du questionnaire n'est pas dans un format correcte",
    HEURE_QUESTIONNAIRE_ERROR = "L'heure du questionnaire n'est pas dans un format correcte",
    HEURE_INSCRIPTION_LIMIT_ERROR = "L'heure limite de l'inscription n'est pas dans un format correcte",
    EMPTY_NOM_ERROR = "Le nom de la formation ne peut pas être vide",
    EMPTY_INFOS_ERROR = "Les infos de la formation ne peut pas être vide",
    EMPTY_DATE_INSCRIPTION_LIMIT_ERROR = "La date limite d'inscription est vide",
    EMPTY_DATE_QUESTIONNAIRE_ERROR = "La date du questionnaire est vide",
    EMPTY_HEURE_QUESTIONNAIRE_ERROR = "L'heure du questionnaire est vide",
    EMPTY_HEURE_LIMIT_INSCRIPTION_ERROR = "L'heure limite de l'inscription est vide",

}

export enum ErrorTypePermissions
{
    TYPE_ERROR = "le type de la permission doit être une chaîne de caractère",
    TYPE_LENGTH = "Le type de la permission doit être compris entre 2 et 150 caractères",
    ACTION_LENGTH = "L'action de la permission doit être compris entre 2 et 150 caractères",
    ACTION_ERROR = "l'action de la permission doit être une chaîne de caractère",
    EMPTY_TYPE_ERROR = "Le type de la permission ne doit pas être vide.",
    EMPTY_ACTION_ERROR = "L'action de la permission ne doit pas être vide."
}

export enum ErrorTypeUtilisateurs
{
    UTILISATEUR_NOT_FOUND = "l'utilisateur n'existe pas",
    TYPE_LENGTH = "Le type de la permission doit être compris entre 2 et 150 caractères",
    ACTION_LENGTH = "L'action de la permission doit être compris entre 2 et 150 caractères",
    ACTION_ERROR = "l'action de la permission doit être une chaîne de caractère",
    EMPTY_TYPE_ERROR = "Le type de la permission ne doit pas être vide.",
    EMPTY_ACTION_ERROR = "L'action de la permission ne doit pas être vide."
}


export enum ErrorGeneral{
    ERROR_UNKNOW ="erreur inconnue du system"
}

export enum ErrorStatus{
    CATEGORIE_NOT_EXIST = 404,
    CATEGORIE_EXIST = 500,
    NOM_EXIST = 500,
    ERROR_UNKNOW = 500,

    UTILISATEUR_NOT_FOUND = 404


}





