module.exports = function (Money, util) {
  var ru = {};

  // 如果参数有错, 这里会抛出异常
  ru.formatParam = function (option) {
    // 本金
    if (option.all === undefined) {
      throw 'Repay-all required';
    }
    option.all = new Money(option.all);

    // 每年期数
    option.periodsPerYear = option.periodsPerYear || 12;

    // 总期数
    if (option.yearsCount !== undefined) {
      option.periodsCount = option.yearsCount * option.periodsPerYear;
    }
    if (option.periodsCount === undefined) {
      throw 'Repay-periods-count required.';
    }

    if (option.beginDate === undefined) {
      option.beginDate = new Date();
    }

    if (option.onDay) {
      if (option.periodsPerYear !== 12) {
        throw 'Repay-periods-per-year 12 required for on-day mode.';
      }
      if (option.ratePerYear !== undefined) {
        option.ratePerDay = new Money(option.ratePerYear).dividedBy(360);
      } else if (option.ratePerMonth !== undefined) {
        option.ratePerDay = new Money(option.ratePerMonth).dividedBy(30);
      }
      if (option.ratePerDay === undefined) {
        throw 'Repay-rate required.';
      }
      // 默认第一天不计利息
      if (option.skipFirst === undefined) {
        option.skipFirst = true;
      }
      // 每期利率按当期数计算
      option.rates = ru.getRatesByDay(option.beginDate, option.ratePerDay, option.periodsCount, option.skipFirst);
    } else {
      // 用日利率和月利率计算年利率
      if (option.ratePerDay !== undefined) {
        option.ratePerYear = new Money(option.ratePerDay).times(360);
      } else if (option.ratePerMonth !== undefined) {
        option.ratePerYear = new Money(option.ratePerMonth).times(12);
      }
      // 用年利率计算每期利率
      if (option.ratePerYear !== undefined) {
        option.ratePerPeriod = new Money(option.ratePerYear).dividedBy(option.periodsPerYear);
      }
      // 每期利率
      if (option.ratePerPeriod === undefined) {
        throw 'Repay-rate required.';
      }
    }

    if (util.datePattern !== undefined) {
      ru.fillRepaymentDates(option);
    }

    return option;
  };

  ru.getPeriod = function (periodMoney, n, option) {
    if (periodMoney.repayInterest !== undefined && option.discounts !== undefined && option.discounts[n - 1] !== undefined) {
      periodMoney.repayInterest = periodMoney.repayInterest.times(option.discounts[n - 1]);
    }
    periodMoney.repayInterest = periodMoney.repayInterest.toCent(Money.option('proximateInterest'));
    // 利息 (repayInterest) 一定不是还款总额减还款本金得到的.
    // 还款本金和还款总额可以不提供其中一个, 用另两参数加减得到.
    // 最后本应检验判断本金加利息等于总和, 鉴于内部调用, 略去.
    if (periodMoney.repayPrincipal === undefined) {
      periodMoney.repayPrincipal = periodMoney.repay.minus(periodMoney.repayInterest);
    } else if (periodMoney.repay === undefined) {
      periodMoney.repay = periodMoney.repayPrincipal.plus(periodMoney.repayInterest);
    }
    periodMoney.number = n;
    if (option.dates) {
      periodMoney.date = option.dates[n - 1];
    }
    return periodMoney;
  };

  ru.getReportFromPeriods = function (periods) {
    var totalMoney = {
      repayPrincipal: new Money(0),
      repayInterest: new Money(0),
      repay: new Money(0)
    };
    for (var i = 0; i < periods.length; i++) {
      var period = periods[i];
      totalMoney.repayPrincipal = totalMoney.repayPrincipal.plus(period.repayPrincipal);
      totalMoney.repayInterest = totalMoney.repayInterest.plus(period.repayInterest);
      totalMoney.repay = totalMoney.repay.plus(period.repay);
    }
    return {
      total: totalMoney,
      periods: periods
    };
  };

  ru.getRatesByDay = function (beginDate, ratePerDay, periodsCount, skipFirst) {
    var rates = new Array(periodsCount);
    var rate = new Money(ratePerDay);
    var year = beginDate.getFullYear();
    var month = beginDate.getMonth();
    month++;
    rates[0] = rate.times(getDay(year, month) - (skipFirst ? 1 : 0));
    for (var i = 1; i < periodsCount; i++) {
      month++;
      rates[i] = rate.times(getDay(year, month));
    }
    return rates;

    function getDay(year, month) {
      return new Date(year, month, 0).getDate();
    }
  };

  ru.fillRepaymentDates = function (option) {
    var dates = [];
    for (var n = 1; n <= option.periodsCount; n++) {
      dates.push(util.dateFormat(util.incMonth(option.beginDate, n)));
    }
    option.dates = dates;
  };

  return ru;

};
