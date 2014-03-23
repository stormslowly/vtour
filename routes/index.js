
/*
 * GET home page.
 */

exports.index = function(req, res){

  res.redirect('/vtour/tour.html');
  // res.render('index', { title: 'Express' });
};