# Demo

---

## 全局配置

````javascript
var fiCalc = require('fi-calc');
var Money = fiCalc.Money;

Money.option({
  // 字符串格式化
  thousand: true, // 是否按千分位加逗号
  prefix: '$ ',   // 前缀
  suffix: '',     // 后缀
  // 取整方式
  proximate: Money.CONST.ROUND    // 取整方式, 可选值: ROUND(四舍五入), FLOOR(向下取整), CEIL(向上取整)
});

var value = new Money(123456.789);

// '$ 123,456.79'
console.log(value.toString());

````


## 还款计划

````javascript
var fiCalc = require('fi-calc');

// 可用函数: 等额本金(mp), 等额本息(mpi), 按月付息到期还本(i).
var fn = fiCalc.repay.mpi;

var option = {
  all: 10000,       // 本金
  // 支持两种参数,
  // 第一种方式:
  ratePerPeriod:  0.00345,  // 每期利率
  periodsCount:   12,       // 总期数
  // 第二种方式:
  ratePerYear:    0.0525,   // 年利率
  yearsCount:     5,        // 总年数
  periodsPerYear: 12        // 每年期数, 缺省 12
  // 两种方式都设置时, 以第二种为准.
};

var report = fn(option);
console.log(report);
/* report 形如: {
    periods: [
      {number: 1, repayPrincipal: ..., repayInterest: ..., repay: ...},
      ...
    ],
    total: {repayPrincipal: ..., repayInterest: ..., repay: ...}
   },
   其中每期 number 为数值, 其余都为按全局配置格式化的金融字符串.
 */
````

