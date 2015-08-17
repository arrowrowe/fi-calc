# 性能测试

---

## 测试

````html
<pre id="J_PerformanceResult"></pre>
````

````javascript
window.jobs = [{
  title: '还款计划 - 按月付息到期还本',
  fn: function (key, fiCalc) {
    fiCalc.repay.i({
      all: 10000,
      yearsCount: 5,
      ratePerYear: 0.0525
    });
  }
}, {
  title: '还款计划 - 等额本金',
  fn: function (key, fiCalc) {
    fiCalc.repay.mp({
      all: 10000,
      yearsCount: 5,
      ratePerYear: 0.0525
    });
  }
}, {
  title: '还款计划 - 等额本息',
  fn: function (key, fiCalc) {
    fiCalc.repay.mpi({
      all: 10000,
      yearsCount: 5,
      ratePerYear: 0.0525
    });
  }
}];
````


## 测试准备

````javascript
var packages = [
  {key: 'big.js', export: require('fi-calc/big')},
  {key: 'bignumber.js', export: require('fi-calc/bignumber')},
  {key: 'decimal.js', export: require('fi-calc/decimal')},
  {key: 'anima-caculate', export: require('fi-calc/anima-caculate')}
];

var $ = window.$ = require('anima-yocto-lite');

var M = function (message) {
  var $m = $('<span>' + message + '<br/></span>').appendTo('#J_PerformanceResult');
  return $m;
};

var judgeIndex = 0;
var RETRY_TIMES = 30;
var J = function (job) {

  var title = '[' + judgeIndex.toString() + ']' + (job.title === undefined ? '' : ' ' + job.title);
  judgeIndex++;

  M(title);
  console.group(title);

  var fn = job.fn;
  for (var index in packages) {
    var package = packages[index], key = package.key, fiCalc = package.export;
    var t = Date.now(); console.time(key); for (var i = 0; i < RETRY_TIMES; i++) { fn(key, fiCalc); } console.timeEnd(key); t = Date.now() - t;
    M('  ' + key + ': ' + t.toString() + 'ms');
  }

  console.groupEnd(title);
};

setTimeout(function () {
  var key = '性能测试(' + RETRY_TIMES.toString() + '遍)';
  var t = Date.now(); console.time(key); for (var i = 0; i < jobs.length; i++) { J(jobs[i]); } console.timeEnd(key); t = Date.now() - t;
  M(key + ': ' + t.toString() + 'ms');
}, 200);
````

