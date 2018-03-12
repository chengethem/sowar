var express = require('express');
var router = express.Router();

/* GET home page. */
async function count(req, res, next) {
  const a = +new Date;
  await next();
  const b = +new Date();
  console.info('response time:', a, b, b - a);
}
router.get('/', count, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
