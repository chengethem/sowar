const express = require('express');
const router = express.Router();
const request = require('request');
const moment = require('moment');
const http = require('http');
const querystring = require('querystring');
// const example_config = {
//   ak: 'e272c99b552547718b06f745db8941d4',
//   timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),

//   memobirdID: '5bcbce64967d923d',
//   useridentifying: 'chenge',
//   userID: 493476
// };
const config = {
  ak: 'e272c99b552547718b06f745db8941d4'
};
// console.info(moment().format('YYYY-MM-DD HH:mm:ss'));
router.get('/bind', (req, res, next) => {
  const options = {
    url: 'http://open.memobird.cn/home/setuserbind',
    form: Object.assign({}, config, {
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      memobirdID: '5bcbce64967d923d',
      useridentifying: 'chenge'
    })
  };
  request.get(options, (err, resp, body) => {
    return res.json({
      err,
      resp,
      body
    });
  });
});
router.get('/print', (req, res, next) => {
  let words = '中文测试';
  words = iconv.encode(words, 'gbk');
  const content = Buffer.from(words).toString('base64');
  const options = {
    url: 'http://open.memobird.cn/home/printpaper',
    form: {
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      memobirdID: '5bcbce64967d923d',
      userID: 493476,
      printcontent: `T:${content}`
    }
  };
});

module.exports = router;