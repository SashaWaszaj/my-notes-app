module.exports = {
    SECRET_KEY: process.env.SECRET_KEY || 'claveSecretaParaJWT',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'claveSecretaParaRefreshTokens',
};