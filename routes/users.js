module.exports = function (passport) {

  var express = require('express');
  var router = express.Router();
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.render('app/home',{ title: 'Home', user: req.user});
  });

  router.get('/new', function (req, res) {
    res.render('app/imagenes/new', { title: 'Upload', user: req.user});
  });

  router.get('/:id/edit',function (req, res) {

  });

  /* REST CRUD */
  router.route('/imagenes/:id')
    .get(function (req, res) {

    })
    .put(function (req, res) {

    })
    .delete(function (req, res) {

    });


  router.get('/logout', function(req, res, next) {
    req.session.destroy(function (err) {
      if(err){
        return nex(err);
      }
      res.redirect('/login');
    });
  });

  return router;
}
