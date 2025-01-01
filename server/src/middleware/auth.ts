import { Shopify } from '@shopify/shopify-api';

export async function verifyRequest(req: any, res: any, next: any) {
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    if (!session?.shop) {
      res.redirect('/auth');
      return;
    }
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).send('Unauthorized');
  }
}