import express from 'express';
import { Shopify } from '@shopify/shopify-api';
import { shopifyConfig } from './config';
import { verifyRequest } from './middleware/auth';
import { setupWebhooks } from './webhooks';
import { productRoutes } from './routes/products';
import { priceRoutes } from './routes/prices';

const app = express();
app.use(express.json());

// Initialize Shopify
Shopify.Context.initialize(shopifyConfig);

// Auth endpoints
app.get('/auth', async (req, res) => {
  const shop = req.query.shop as string;
  if (!shop) {
    res.status(400).send('Missing shop parameter');
    return;
  }

  const authRoute = await Shopify.Auth.beginAuth(
    req,
    res,
    shop,
    '/auth/callback',
    false
  );
  res.redirect(authRoute);
});

app.get('/auth/callback', async (req, res) => {
  try {
    const session = await Shopify.Auth.validateAuthCallback(
      req,
      res,
      req.query as Record<string, string>
    );
    await setupWebhooks(session.shop, session.accessToken);
    res.redirect(`/?shop=${session.shop}`);
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).send('Authentication failed');
  }
});

// API routes
app.use('/api/products', verifyRequest, productRoutes);
app.use('/api/prices', verifyRequest, priceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});