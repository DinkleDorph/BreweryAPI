var express = require('express');
var router = express.Router();

const stateRouter = require("./state");                            // added this
const typeRouter = require("./type");                              // added this

router.use("/state", stateRouter);                                 // added this
router.use("/type", typeRouter);                                   // added this

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Brewery API' });
});

module.exports = router;
