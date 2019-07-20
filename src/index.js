const Koa = require('koa');
const mount = require('koa-mount');
const app = new Koa();
const serve = require('koa-static');
const path = require('path');

const graphqlHttp = require('koa-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const checkJwt = require('./services/auth');

app.use(serve(path.join(__dirname, '/public')));

app.use(checkJwt());

// TODO need to move routes to separated files;
const Router = require('koa2-router');
const router = Router();
// require our external routes and pass in the router
require('./routes')({ router });

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

app.use(
  mount(
    '/graphql',
    graphqlHttp({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true
    })
  )
);

app.use(router);

app.listen(process.env.PORT || 3000);

console.log('listen ', process.env.PORT || 3000);
