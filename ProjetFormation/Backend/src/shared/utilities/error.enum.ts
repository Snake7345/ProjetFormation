export enum ErrorTypeCategories{
    NOM_ERROR = "Le nom doit être une chaine de caractère",
    NOM_LENGTH = "Le nom doit être compris entre 2 et 100 caractères",
    CATEGORIE_NOT_EXIST = "Cette catégorie n'existe pas",
    CATEGORIE_EXIST = "Cette catégorie existe déjà",
    NOM_EXIST = "Le nom de la catégorie existe déjà",
    DUPLICATE_USER = "user not created, duplicate entry",
    ERROR_UNKNOW ="erreur inconnue du system"
}

export enum ErrorGeneral{
    EMPTY_ERROR = "La valeur ne peut pas être vide",
    USER_ALREADY_EXIST = "User already exist",
    DUPLICATE_USER = "user not created, duplicate entry",
    ERROR_UNKNOW ="erreur inconnue du system"
}

export enum ErrorStatus{
    CATEGORIE_NOT_EXIST = 404,
    CATEGORIE_EXIST = 500,
    NOM_EXIST = 500,
    ERROR_UNKNOW = 500


}





