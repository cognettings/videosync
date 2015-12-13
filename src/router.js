var controller = require('./controller');

function router(app) {
  app.get('/', controller.home.homePage);
  app.get('/watch', controller.watch.watchPage);
  app.get('/history', controller.history.historyPage);
}

module.exports = router;