const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./tools/db.json');
const middlewares = jsonServer.defaults();

const port = 4444;
const db = 'http://localhost:' + port;

// const get = {
//   "/modules/:id/feedback-status": "/feedback-status/:id"
// };
//
// const post = {
//   "/modules/:id/feedback": "/feedback/:id"
// };

// console.log(jsonServer.rewriter({
//   '/modules/:id/feedback-status': '/feedback-status/:id',
//   '/modules/:id/feedback': '/feedback/:id'
// }));

server.use('/modules/:id/feedback-status', function (req, res) {
  res.redirect('/feedback-status/' + req.params.id);
});

server.use('/modules/:id/feedback', function (req, res) {
  res.redirect('/feedback/' + req.params.id);
});

// server.use(jsonServer.rewriter({
//   '/modules/:id/feedback-status': '/feedback-status/:id',
//   '/modules/:id/feedback': '/feedback/:id'
// }));

server.use(middlewares);
server.use(router);
server.listen(port, function () {
  console.log('JSON Server is running :: ' + db);
});
