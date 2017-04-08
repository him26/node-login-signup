var express = require('express'),
router = express.Router();

router.use(require('./session'));
router.use(require('./login'));
router.use(require('./signup'));
router.use(require('./logout'));

module.exports = router;
// router.use(function (req, res, next) {
//     var send = res.send;
//     res.send = function () {
//         res.send = send;
//         res.emit('end');
//         res.send.apply(this, arguments);
//     }
//     next();
// });
