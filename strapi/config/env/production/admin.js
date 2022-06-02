module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0afaf17b26891da67f2e6ae71288aa48'),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT")
  }
});
