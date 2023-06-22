import express from 'express';
import { UserModel } from '../DAO/models/users.model.js';

let usuarios = [
  { id: '100', firstName: 'guille', email: 40 },
  { id: '101', firstName: 'laura', email: 20 },
  { id: '102', firstName: 'pepe', email: 18 },
];

export const usersHtmlRouter = express.Router();
usersHtmlRouter.get('/', async (req, res) => {
  const { page } = req.query;
  console.log(page);
  const query = await UserModel.paginate({}, { limit: 10, page: page || 1 });
  usuarios = query.docs.map((item) => {
    return { firstName: item.firstName, email: item.email };
  });
  const { docs, ...rest } = query;
  let links = [];
  for (let i = 1; i < rest.totalPages + 1; i++) {
    links.push({ label: i, href: 'http://localhost:3000/users/?page=' + i });
  }
  console.log(links);
  return res.status(200).render('usuarios', { usuarios, pagination: rest, links });
});
