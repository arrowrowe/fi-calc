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

````html
<p>
  <select id="J_RepayMethod">
    <option value="mpi">等额本息</option>
    <option value="mp">等额本金</option>
    <option value="i">按月付息到期还本</option>
  </select>
  本金 <input id="J_RepayAll" type="number" value="10000">,
  年利率 <input id="J_RepayRatePerYear" type="number" value="5.25">%,
  <input id="J_RepayYearsCount" type="number" value="5"> 年.
  <button id="J_GetRepayPlan">计算</button>
</p>
<p>
  字符串格式化设置:
  <input id="J_RepayOptionThousand" type="checkbox" checked> 按千分割;
  前缀: <input id="J_RepayOptionPrefix" type="text" value="">,
  后缀: <input id="J_RepayOptionSuffix" type="text" value=" 元">.
</p>
<table class="repay-plan">
  <thead><tr><th>期数</th><th>还款本金</th><th>还款利息</th><th>当期还款总额</th></tr></thead>
  <tbody id="J_RepayTable"></tbody>
</table>
````

````javascript
var fiCalc = require('fi-calc');
var $ = require('anima-yocto-lite');

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

// 可用函数: 等额本金(mp), 等额本息(mpi), 按月付息到期还本(i).
var report = fiCalc.repay.mpi(option);
render(report);
/* report 形如: {
    periods: [
      {number: 1, repayPrincipal: ..., repayInterest: ..., repay: ...},
      ...
    ],
    total: {repayPrincipal: ..., repayInterest: ..., repay: ...}
   },
   其中每期 number 为数值, 其余都为按全局配置格式化的金融字符串.
 */

$('#J_GetRepayPlan').click(function () {
  fiCalc.Money.option({
    thousand: $('#J_RepayOptionThousand').attr('checked'),
    prefix: $('#J_RepayOptionPrefix').val(),
    suffix: $('#J_RepayOptionSuffix').val()
  });
  render(fiCalc.repay[$('#J_RepayMethod').val()]({
    all: $('#J_RepayAll').val(),
    ratePerYear: Number($('#J_RepayRatePerYear').val()) / 100,
    yearsCount: Number($('#J_RepayYearsCount').val())
  }));
});

function render(report) {
  console.log(report);
  $('#J_RepayTable').html(report.periods.map(function (period) {
    return '<tr><td>' + [
      period.number.toString(),
      period.repayPrincipal,
      period.repayInterest,
      period.repay
    ].join('</td><td>') + '</td></tr>'
  }).join('') + '<tr><td>总计</td><td>' + [
    report.total.repayPrincipal,
    report.total.repayInterest,
    report.total.repay
  ].join('</td><td>') + '</td></tr>');
}
````

````css
.repay-plan { width: 100%; text-align: right; }
.repay-plan tr:nth-child(12n+1) { border-top: 1px solid; }
.repay-plan th,td { padding: 0 24px;  }
````

