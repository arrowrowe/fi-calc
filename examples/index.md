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
  proximate: Money.CONST.ROUND,           // 取整方式, 可选值: ROUND(四舍五入), FLOOR(向下取整), CEIL(向上取整)
  proximatePrincipal: Money.CONST.FLOOR,  // 可以另行设置计算本金和利息时的取整方式,
  proximateInterest: undefined            // 设为 undefined 时就以 proximate 为准.
});

fiCalc.util.datePattern = 'YYYY/MM/DD';   // 这是默认日期格式, 支持 YYYY, YY, MM, M, DD, D.

var value = new Money(123456.789);

console.assert(value.toFinance() === '$ 123,456.79');
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
  利息计算方式设置:
  <input id="J_RepayOnDay" type="checkbox"> 按日计息
  <input id="J_RepaySkipFirst" type="checkbox" checked> 按日计息时, 不计第一天利息;
  计算取整方式: 本金向下取整, 其余四舍五入
</p>
<p>
  起始日期:
  <input id="J_BeginDate" type="date">,
  日期格式设置:
  <input id="J_DatePattern" type="text" value="YYYY/MM/DD">
  (支持 YYYY, YY, MM, M, DD, D)
</p>
<p>
  字符串格式化设置:
  <input id="J_RepayOptionThousand" type="checkbox" checked> 按千分割;
  前缀: <input id="J_RepayOptionPrefix" type="text" value="">,
  后缀: <input id="J_RepayOptionSuffix" type="text" value=" 元">.
</p>
<table class="repay-plan">
  <thead><tr><th>期数</th><th>还款日</th><th>还款本金</th><th>还款利息</th><th>当期还款总额</th></tr></thead>
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
  ratePerPeriod:  0.00345,  // 每期利率, 开启 onDay 时无效
  periodsCount:   12,       // 总期数
  // 第二种方式:
  ratePerYear:    0.0525,   // 年利率, 若设置 ratePerDay 或 ratePerMonth, 按 1:30:360 换算.
  yearsCount:     5,        // 总年数
  periodsPerYear: 12,       // 每年期数, 缺省 12
  // 两种方式都设置时, 以第二种为准.
  onDay: false,         // 按日计息, 每个月按当月天数重新计算月利率. 需要 ratePerDay, 若设置其他 ratePer*, 同上换算.
  skipFirst: true,      // 仅在开启 onDay 时有意义, 默认 true, 表示不计第一天的利息
  beginDate: undefined  // 仅在开启 onDay 时有意义, 默认为当天日期 new Date()
  // 更多参数样例参见测试样例.
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
  fiCalc.util.datePattern = $('#J_DatePattern').val();
  render(fiCalc.repay[$('#J_RepayMethod').val()]({
    beginDate: new Date($('#J_BeginDate').val()),
    all: $('#J_RepayAll').val(),
    ratePerYear: Number($('#J_RepayRatePerYear').val()) / 100,
    yearsCount: Number($('#J_RepayYearsCount').val()),
    onDay: $('#J_RepayOnDay').attr('checked'),
    skipFirst: $('#J_RepaySkipFirst').attr('checked')
  }));
});

function render(report) {
  console.log(report);
  $('#J_RepayTable').html(report.periods.map(function (period) {
    return '<tr><td>' + [
      period.number.toString(),
      period.date,
      period.repayPrincipal,
      period.repayInterest,
      period.repay
    ].join('</td><td>') + '</td></tr>'
  }).join('') + '<tr><td colspan="2">总计</td><td>' + [
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

