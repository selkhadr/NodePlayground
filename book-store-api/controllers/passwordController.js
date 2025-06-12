const asyncHandler = require("express-async-handler");



/**
 * @descp get Fogot password View
 * @method Pots
 * @url /password/forgot-password
 * @access public
 */
module.exports.getForgotPaswordView = asyncHandler((req, res) =>{
    res.render('forgot-password');
})
