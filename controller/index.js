var express = require('express'),
router = express.Router();
router.get('/',function(req,res){
   res.send('main controller');
});
router.use('/api',require('./signup'));
router.use('/api',require('./login'));

module.exports = router;
