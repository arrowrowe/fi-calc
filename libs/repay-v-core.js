module.exports = function (util, ru, repayMPI, repayMP, repayI) {
  var repayMethods = {
    mpi: repayMPI,
    mp: repayMP,
    i: repayI
  };

  var getRepayPlan = function (fn, option) {
    ru.formatParam(option);
    var periods = fn(option);
    var report = ru.getReportFromPeriods(periods);
    return util.str(report);
  };

  return {
    mpi: function (option) { return getRepayPlan(repayMethods.mpi, option); },
    mp: function (option) { return getRepayPlan(repayMethods.mp, option); },
    i: function (option) { return getRepayPlan(repayMethods.i, option); }
  };
};
