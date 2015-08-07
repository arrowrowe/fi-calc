# fi-calc

---

金融计算. 支持
- 还款计划生成, 包括: 按月付息到期还本, 等额本金, 等额本息.
- 自定义取整方式, 包括: 四舍五入, 向上取整, 向下取整.
- 自定义金融字符串的格式化, 包括: 是否按千分加逗号, 前缀, 后缀.

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

