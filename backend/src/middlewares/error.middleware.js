/**
 * Middleware global de gestion d'erreurs.
 */
export function notFoundMiddleware(_req, res) {
  res.status(404).json({ error: 'Route introuvable' });
}

export function errorHandlerMiddleware(err, _req, res) {
  // Erreurs d'unicité Supabase
  if (err.code === '23505') {
    return res.status(409).json({ error: 'Ce login existe déjà.' });
  }

  console.error('[Error]', err.message);
  res.status(500).json({ error: 'Erreur serveur interne' });
}
