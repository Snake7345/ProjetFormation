import { JwtModule } from '@nestjs/jwt';
/*
* Ce fichier configure le module JwtModule de NestJS. Il spécifie la clé secrète à utiliser pour signer les tokens JWT et les options de signature.
* Dans ce cas, la clé secrète est configurée pour avoir une validité de 24 heures (expiresIn: '24h').
*
*
* */
export const jwtConfig = JwtModule.register({
    secret: 'your-secret-key',
    signOptions: {
        expiresIn: '24h', // Mettez à jour la durée de validité du token
    },
});