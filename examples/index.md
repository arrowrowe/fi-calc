# Demo

---

## 还款计划

```javascript
var fiCalc = require('fi-calc');

// 可用函数: 等额本金(mp), 等额本息(mpi), 按月付息到期还本(i).
var fn = fiCalc.repay.mpi;

var option = {
  all: 10000,       // 本金
  rate: 0.00345,    // 每期利率
  periodsCount: 12  // 总期数
};

var report = fn(option);
/* report 形如: {
    periods: [
      {number: 1, repayPrincipal: ..., repayInterest: ..., repay: ...},
      ...
    ],
    total: {repayPrincipal: ..., repayInterest: ..., repay: ...}
   }
 */
```

## 字符串格式化

```javascript
var fiCalc = require('fi-calc');
var Money = fiCalc.Money;

Money.option({
 thousand: true,  // 是否按千分位加逗号
 prefix: '$ ',    // 前缀
 suffix: ''       // 后缀
});

var value = new Money(123456.7);

value.toString(); // '$ 123,456.70'

```

