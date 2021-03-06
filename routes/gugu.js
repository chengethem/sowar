const express = require('express');
const router = express.Router();
const request = require('request');
const moment = require('moment');
const http = require('http');
const querystring = require('querystring');
const Iconv = require('iconv').Iconv;
const Memobird = require('memobird');
// const gm = require('gm');
// const example_config = {
//   ak: 'e272c99b552547718b06f745db8941d4',
//   timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),

//   memobirdID: '5bcbce64967d923d',
//   useridentifying: 'chenge',
//   userID: 493476
// };
const memobird = new Memobird({
  ak: 'e272c99b552547718b06f745db8941d4',
  memobirdID: '5bcbce64967d923d',
  useridentifying: 'chenge',
});
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
  let words = '记得吃药';
  const iconv = new Iconv('UTF-8', 'gbk');
  words = iconv.convert(words);
  const content = Buffer.from(words).toString('base64');
  const options = {
    url: 'http://open.memobird.cn/home/printpaper',
    form: Object.assign({}, config, {
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      memobirdID: '5bcbce64967d923d',
      userID: 493476,
      printcontent: `T:${content}`
    })
  };
  request.post(options, (err, resp, body) => {
    console.info('resp', err, resp, body);
    return res.json({
      err,
      resp,
      body
    });
  });
});
// const encodeImage = function (data) {
//   return new Promise((resolve, reject) => {
//     console.info('~~~', data.length);
//     gm(data).resize(384).flip().type('Bilevel').colors(2).toBuffer('bmp', (error, buffer) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(`P:${buffer.toString('base64')}`);
//       }
//     });
//   });
// }

function data2base64(data) {

}
router.get('/printpic', (req, res, next) => {
  let url = 'http://oezn2ph4e.bkt.clouddn.com/IMG_4666.JPG';
  // memobird.init()
  //   .then(() => memobird.printText('你好咕咕机'))
  //   .then(printcontentid => memobird.glance(printcontentid, 1000))
  //   .then(printflag => {
  //     return res.json({ printflag });
  //   })
  //   .catch(e => {
  //     console.info('catche_', e);
  //   });

  memobird.init()
    .then(() => memobird.printImage(url))
    .then(printcontentid => memobird.watch(printcontentid, 3000, 15000))
    .then(printflag => {
      console.log('打印状态:', printflag);
      return res.json({ printflag });
    });

  // memobird.init()
  // .then(() => memobird.printImage('http://7xrs2s.com1.z0.glb.clouddn.com/5388545BF2D3F99643AFE22BE8C87B8A.jpg'))
})

module.exports = router;