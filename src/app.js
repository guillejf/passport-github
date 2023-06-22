import MongoStore from 'connect-mongo';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import { iniPassport } from './config/passport.config.js';
import { sessionsRouter } from './routes/sessions.router.js';
import { viewsRouter } from './routes/views.router.js';
import { __dirname, connectMongo, connectSocket } from './utils.js';

const app = express();
const port = 3000;

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

connectMongo();
connectSocket(httpServer);

//CONFIG EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://guillermofergnani:DBeXuiDCQMqLyMTa@51380.yhqtnxt.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 7200 }),
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
  })
);

//TODO LO DE PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());
//FIN TODO LO DE PASSPORT

//CONFIG RUTAS
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);
/* app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/users', usersHtmlRouter);
app.use('/test-chat', testSocketChatRouter);
app.use('/auth', authRouter); */
app.get('*', (_, res) => {
  return res.status(404).json({
    status: 'error',
    msg: 'no encontrado',
    data: {},
  });
});
