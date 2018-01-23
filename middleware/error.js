module.exports = {
  notFound(req, res, next) {
      let error = new Error('Not Found');
      error.status = 404;

      next(error);
  },

  development(error, req, res, next) {
      console.error(error);

      res.render('error', {
          id: 'error',
          title: 'Error',
          error
      });
  },

  production(error, req, res, next) {
      res.render('error', {
          id: 'error',
          title: 'Error',
          message: error.message
      });
  }
};