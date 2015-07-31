var util = require('./util');
var ru = require('./repay/repay-util');
var repayMethods = {
  mpi: require('./repay/repay-mpi'),
  mp: require('./repay/repay-mp'),
  i: require('./repay/repay-i')
}

var getRepayPlan = function (fn, option) {
  ru.formatParam(option);
  var periods = fn(option);
  var report = ru.getReportFromPeriods(periods);
  return util.str(report);
};

module.exports = {
  mpi: function (option) { return getRepayPlan(repayMethods.mpi, option); },
  mp: function (option) { return getRepayPlan(repayMethods.mp, option); },
  i: function (option) { return getRepayPlan(repayMethods.i, option); }
};

