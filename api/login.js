export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};

  // Password can be set via Vercel env var AUTH_PASSWORD, defaults to 'avyro2026'
  const correctPassword = process.env.AUTH_PASSWORD || 'avyro2026';

  if (password === correctPassword) {
    // Set auth cookie - expires in 30 days
    res.setHeader(
      'Set-Cookie',
      `avyro_auth=authenticated; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
    );
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: 'Wrong password' });
}
