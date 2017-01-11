var url = require('url');
const connection = require('../../db/index.js');

module.exports = function(app) {
  app.route('/dishes/chefs/:id')
    .get(function(req, res, next) {
      let chefId = req.params.id;
      let qString = 'SELECT * FROM dishes WHERE id_chefID = ?';

      connection.query(qString, [chefID], function(err, results) {
        if (err) {
          next(err)
        } else {
          res.send(results);
        }
      });
    })
    .post(function(req, res, next) {
      let chefId = req.params.id;

      let {name, text, image, price, restrictions, cuisine} = req.body
      let qString = 'INSERT INTO dishes (name, text, image, price, restrictions, cuisines, id_chefID) VALUES (?, ?, ?, ?, ?, ?, ?)'
      connection.query(qString, 
        [name, text, image, parseInt(price), restrictions, cuisine, chefId],
        function(err, results) {
          if (err) {
            res.sendStatus(500);
          } else {
            res.send('Dish was created!!');
          }
        }
      );
    });

  app.route('/dishes/:dishId')
    .put(function(req, res, next) {
      let dish = req.body;
      // let chefId = req.params.id;
      let dishId = req.params.dishId;
      let qString = 'UPDATE dishes SET name = ?, text = ?, image = ?, price = ?\
                      WHERE id = ?';

      connection.query(qString, 
        [dish.name, dish.text, dish.image, parseInt(dish.price), dishId],
        function(err, results) {
          if (err) {
            res.sendStatus(500);
          }
          res.sendStatus(200);
        }
      );
      res.send(insertId);
    })
    .delete(function(req, res, next) {
      let dish = req.body;
      let dishId = req.params.dishId;
      let qString = 'DELETE FROM dishes WHERE id = ?';
      connection.query(qString,
        [dishId],
        function(err, results) {
          if(err) {
            res.sendStatus(500);
          }
          res.sendStatus(202);
        }
      );
    });
}