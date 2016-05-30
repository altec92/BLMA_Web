
/*
 * GET home page.
 */

exports.home = function(req, res){
  res.render('home', {title: 'BLMA: Home'});
};

exports.TaiChi = function(req, res){
  res.render('TaiChi', {title: 'BLMA: TaiChi'});
};

exports.KungFu = function(req, res){
  res.render('KungFu', {title: 'BLMA: KungFu'});
};

