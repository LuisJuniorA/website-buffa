/**
 * Validateur de corps de requête pour l'inscription.
 */
export function validateRegister(req, res, next) {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: 'login et password sont requis.' });
  }

  if (typeof login !== 'string' || login.trim().length < 3) {
    return res
      .status(400)
      .json({ error: 'Le login doit contenir au moins 3 caractères.' });
  }

  if (typeof password !== 'string' || password.length < 6) {
    return res
      .status(400)
      .json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });
  }

  req.body.login = login.trim();
  next();
}
