import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {UtilisateursEntity} from "../shared/entities/utilisateurs.entity";
import {PermissionsDto} from "../shared/dto/permissions/permissions.dto";
/*
* Ce fichier contient le service CustomJwtService qui est responsable de la génération et de la vérification des tokens JWT personnalisés.
* Il utilise la bibliothèque jsonwebtoken pour ces opérations. Le service contient une clé secrète utilisée pour signer et vérifier les tokens.
* Il a deux méthodes principales :generateToken() :
* Cette méthode génère un token JWT en utilisant les informations de l'utilisateur et les permissions fournies.
* Le payload du token contient l'ID de l'utilisateur, son adresse e-mail et les permissions.
* verifyToken(token: string):
* Cette méthode vérifie la validité d'un token en utilisant la clé secrète.
* Elle renvoie le payload du token contenant l'ID de l'utilisateur, son adresse e-mail et les permissions.
* */
@Injectable()
export class CustomJwtService {
    private readonly secretKey = 'your-secret-key'; // Remplacez par votre clé secrète

    generateToken(user: UtilisateursEntity, permissions: PermissionsDto[]): string {
        const payload = { id: user.idUtilisateurs, email: user.mail, permissions };
        return jwt.sign(payload, this.secretKey, { expiresIn: '24h' });
    }

    verifyToken(token: string): { id: number; email: string; permissions: PermissionsDto[] } {
        return jwt.verify(token, this.secretKey) as { id: number; email: string; permissions: PermissionsDto[] };
    }
}