import { middlewares } from '../utils';

export default function bookmarks (Router, db) {
  return Router()
  .get('/', middlewares.auth(db), (req, res) => {
    db.models.bookmarks.findAll({ where: req.query, include: [{ model: db.models.entities }], order: [['createdAt', 'DESC']]})
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
  })
  .post('/', middlewares.auth(db), (req, res) => {
    const { title = 'My Bookmarks', entityId } = req.body;
    const userId = req.user.id;
    db.models.bookmarks.create({ title, entityId, userId })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
  })
  .delete('/', middlewares.auth(db), (req, res) => {
    const { title = 'My Bookmarks', entityId } = req.body;
    const userId = req.user.id;
    db.models.bookmarks.destroy({ where: { title, entityId, userId }})
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
  })
}
