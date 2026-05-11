import { LivreModel } from '../models/livreModel.js';
import { AuteurModel } from '../models/auteurModel.js';

export const livreController = {
  liste: async (req, res) => {
    const { rows } = await LivreModel.getAll();

    res.render('pages/livres/liste', {
      title: 'Livres',
      livres: rows,
      searchTerm: req.query.q || ''
    });
  },

  rechercher: async (req, res) => {
    const { rows } = await LivreModel.search(req.query.q || '');

    res.render('pages/livres/liste', {
      title: 'Recherche',
      livres: rows,
      searchTerm: req.query.q || ''
    });
  },

  ajouterForm: async (req, res) => {
    const { rows: auteurs } = await AuteurModel.getAll();

    res.render('pages/livres/ajouter', {
      title: 'Ajouter livre',
      livre: {},
      auteurs
    });
  },

  ajouter: async (req, res) => {
    const data = {
      ...req.body,
      disponible: req.body.disponible === 'on'
    };

    await LivreModel.create(data);
    res.redirect('/livres');
  },

  details: async (req, res) => {
    const { rows } = await LivreModel.getById(req.params.id);

    if (!rows[0]) {
      return res.status(404).render('pages/404', {
        title: 'Introuvable'
      });
    }

    res.render('pages/livres/details', {
      title: rows[0].titre,
      livre: rows[0]
    });
  },

  modifierForm: async (req, res) => {
    const { rows: livres } = await LivreModel.getById(req.params.id);
    const { rows: auteurs } = await AuteurModel.getAll();

    if (!livres[0]) {
      return res.status(404).render('pages/404', {
        title: 'Introuvable'
      });
    }

    res.render('pages/livres/modifier', {
      title: 'Modifier livre',
      livre: livres[0],
      auteurs
    });
  },

  modifier: async (req, res) => {
    const data = {
      ...req.body,
      disponible: req.body.disponible === 'on'
    };

    await LivreModel.update(req.params.id, data);
    res.redirect(`/livres/${req.params.id}`);
  },

  supprimer: async (req, res) => {
    await LivreModel.delete(req.params.id);
    res.redirect('/livres');
  }
};