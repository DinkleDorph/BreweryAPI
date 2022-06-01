var express = require('express');
var router = express.Router();

const stateRouter = require("./state");
const typeRouter = require("./type");

router.use("/state", stateRouter);
router.use("/type", typeRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Brewery API' });
});

module.exports = router;
