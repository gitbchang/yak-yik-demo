const express = require('express');
const router = express.Router();
const ZoneController = require('../controllers/ZoneController');

router.get('/:resource', function(req, res, next){
  let resource = req.params.resource;
  
  if(resource === 'zone'){
    // in post/put routes we use req.body instead
    // in get routes, we use req.query
    ZoneController.find(req.query, function(err, results){
        if(err){
          res.json({
            confirmation: 'fail',
            message: err
          });
          return;       
        }
        res.json({
          confirmation: 'success',
          results: results
        });
    });
  }
});

router.get('/:resource/:id', function(req, res, next){
  let resource = req.params.resource;
  let id = req.params.id;

  if(resource === 'zone'){
    ZoneController.findById(id, function(err, result){
      if(err){
        res.json({
          confirmation: 'fail',
          message: err
        });
        return;
      }
      res.json({
        confirmation: 'success',
        result: result
      });
    });
  }
});

module.exports = router;
