module.exports = function (passport) {

  var path = require('path');
  var fs = require('fs');
  var express = require('express');
  var router = express.Router();

  var ImageModel = require('../models/Image');

  var multer = require('multer');
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
  });
  var upload = multer({ storage: storage });

  var cloudinary = require('cloudinary');
  cloudinary.config({
    cloud_name: 'yeyoxfunny',
    api_key: '448254519344397',
    api_secret: 'PSlp0GnmCwAw7ivPXeIxFHe1NaQ'
  });

  router.get('/', function(req, res, next) {
    ImageModel.find({user: req.user._id},function (err, imagenes) {
        if(err){
          return next(err);
        }
        console.log(imagenes);
        res.render('app/home',{ title: 'Home', user: req.user, images: imagenes});
    });
  });

  router.get('/new', function (req, res) {
    res.render('app/imagenes/new', { title: 'Upload', user: req.user});
  });

  router.get('/:id/edit',function (req, res) {

  });

  /* REST CRUD */
  router.post('/imagenes',upload.single('image_file'),function (req, res,next) {
    cloudinary.uploader.upload(req.file.path,function(result) {
      if(result.error){
        return next(result.error);
      }
      var imagen = new ImageModel({
        title: req.body.title,
        description: req.body.description,
        urlImage: result.url,
        user: req.body.user
      });
      imagen.save(function (err, doc) {
        if(err){
          console.log('El error fue aquí');
          return next(err);
        }
        fs.unlink(req.file.path,function (err) {
          if (err) {
            next(err);
          }
          return res.redirect('/app');
        });
      });
    });
  });

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
