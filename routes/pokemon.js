var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'pokemon'
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  knex.raw(`SELECT * from pokemon`).then(function(data) {
    res.send(data.rows)
  })
})

//Render trainer page
router.get('/:id', function(req, res, next) {
  knex.raw(`SELECT * FROM pokemon WHERE id = ${req.params.id}`)
    .then(function(data) {
      console.log(data.rows);
      res.send(data.rows);
    });
});

//Add new trainer
router.post('/', function(req, res, next) {
  knex.raw(`INSERT into pokemon (name) values ('${req.body.name}')`).then(function(data) {
    res.redirect('/pokemon')
  });
})

//Update existing trainer
router.post('/:id/', function(req, res, next) {
  knex.raw(`UPDATE pokemon set name = '${req.body.name}' WHERE id = ${req.params.id}`).then(function(data) {
    res.redirect(`/pokemon/${req.params.id}`);
  })
});

//Delete a trainer
router.post('/:id/delete', function(req, res, next) {
  knex.raw(`DELETE from pokemon where id = ${req.params.id}`).then(function(data) {
    res.redirect('/pokemon')
  })
});

module.exports = router;
