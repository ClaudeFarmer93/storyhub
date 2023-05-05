const httpStatus = require("http-status-codes");

exports.notFoundError = (req, res) => {
  let errorStatus = httpStatus.NOT_FOUND;

  res.status(errorStatus);
  res.send(`${errorStatus} | Heeeey Moooom! WHere have u seen the webpage!?`);
  // res.render("error");
};

exports.internalError = (error, req, res, next) => {
  let errorStatus = httpStatus.INTERNAL_SERVER_ERROR;

  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorStatus);
  res.send(
    `${errorStatus} | Sorry something went horribly wrong, we must now commit sudoku!`
  );
};
