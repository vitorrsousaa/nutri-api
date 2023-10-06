import { Router } from 'express';

const routes = Router();

routes.use('/api', (req, res) => {
  res.json({ message: 'ok' });
});

export default routes;
