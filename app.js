import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import auteurRoutes from './routes/auteurRoutes.js';
import livreRoutes from './routes/livreRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));

app.get('/', (req, res) => {
  res.render('pages/accueil', {
    title: 'Accueil - Bibliothèque'
  });
});

app.use('/auteurs', auteurRoutes);
app.use('/livres', livreRoutes);

app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Page non trouvée'
  });
});

app.listen(PORT, () => {
  console.log(`Écoute sur http://localhost:${PORT}`);
});