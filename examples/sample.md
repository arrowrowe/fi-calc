# 实例

---

## 普通还款计划

````javascript
var fiCalc = require('fi-calc');

// 等额本金 (Matching the Principal Repayment)
var report = fiCalc.repay.mp({
  all: 10000,         // 总额 10000 元
  ratePerDay: 0.0005, // 日利率 0.05%
  onDay: true,        // 按日计息
  skipFirst: false,   // 第一日也计息
  yearsCount: 1       // 一年, 默认按12个月
});

// 输出见控制台
console.log(report);
````

## 组合贷

六加六组合贷, 前六个月按月付息, 后六个月等额本金.

````javascript
var fiCalc = require('fi-calc');

var option = {
  all: 10000,         // 总额 10000 元
  ratePerDay: 0.0005, // 日利率 0.05%
  onDay: true,        // 按日计息
  skipFirst: false,   // 第一日也计息
  periodsCount: 7     // 先算七个月的按月付息
};

// 取七个月的按月付息, 截取报告的前六个月
var firstHalf = fiCalc.repay.i(option).periods.slice(0, -1);

// 取第七个月开始的六个月的等额本金, 把序号加6
option.beginDate = fiCalc.util.incMonth(new Date(), 6);
option.periodsCount = 6;
var secondHalf = fiCalc.repay.mp(option).periods.map(function (p) {
  p.number += 6;
  return p;
});

// 用两段拼接, 重新总计并转换为字符串
var report = fiCalc.util.str(fiCalc.ru.getReportFromPeriods(firstHalf.concat(secondHalf)));

// 输出见控制台
console.log(report);
````

