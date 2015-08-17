# fi-calc

---

[![spm version][spm-image]][spm-url]
[![build status][ci-image]][ci-url]
[![coverage status][coverage-image]][coverage-url]

[spm-image]: http://spmjs.io/badge/fi-calc
[spm-url]: http://spmjs.io/package/fi-calc
[ci-image]: https://api.travis-ci.org/arrowrowe/fi-calc.svg?branch=master
[ci-url]: https://travis-ci.org/arrowrowe/fi-calc
[coverage-image]: https://coveralls.io/repos/arrowrowe/fi-calc/badge.svg?branch=master&service=github
[coverage-url]: https://coveralls.io/github/arrowrowe/fi-calc?branch=master

---

金融计算. 支持
- 还款计划生成, 包括: 按月付息到期还本, 等额本金, 等额本息. 可选按日计息. 可输出每期还款日. 可指定各期利息折扣.
- 自定义取整方式, 包括: 四舍五入, 向上取整, 向下取整. 本金和利息的计算可以采用不同的取整方式.
- 自定义金融字符串的格式化, 包括: 是否按千分加逗号, 前缀, 后缀.
- 自定义日期格式.

## Installation

```
$ spm i --save fi-calc
```

底层默认依赖 [big.js](http://spmjs.io/packages/big.js):

```javascript
var fiCalc = require('fi-calc');
```

也可以指定要依赖的库, 可用依赖参见 [历史版本](http://docs.spmjs.io/fi-calc/latest/history.html).

```javascript
var fiCalc = require('fi-calc/anima-caculate')
```

## Use

```javascript
// 已引用 fiCalc
var Money = fiCalc.Money;

Money.option({/* 自定义全局配置 */});

// 计算等额本息(MPI)的还款计划
fiCalc.repay.mpi({all: 10000, ratePerYear: 0.0525, yearsCount: 5});

// 使用 Money 对象, 支持 plus/minus/times/dividedBy/pow, toCent 和 toFinance 等.
var x = new Money(1.23);
```

详见 [实例](http://docs.spmjs.io/fi-calc/latest/examples/) 和 [性能测试](http://docs.spmjs.io/fi-calc/latest/examples/performance.html).

## Test

命令行测试:

```
$ npm test
```

访问 [在线测试](http://docs.spmjs.io/fi-calc/latest/tests/runner.html) 或本地执行

```
$ spm doc
```

访问 127.0.0.1:8000 的测试页面.

