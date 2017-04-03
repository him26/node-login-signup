var express = require('express'),
router = express.Router();
router.get('/',function(req,res){
   res.send('main controller');
});
router.use('/api',require('./signup'));
router.use('/api',require('./login'));

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
