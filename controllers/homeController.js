exports.sendReqParam = (req, res) => {
  let genre = req.params.genre;
  res.send(`This is the page for ${genre}`);
  console.log(req.query);
  console.log(req.body);
};
