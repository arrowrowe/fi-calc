# History

---

## 1.0.6

`NEW` 输出每期还款日, 可设置日期格式.

`NEW` 新增全局参数 doesDiscountAddPrincipal 和还款计划参数 discounts, 可指定某几期的利息折扣.

`CHANGED` 等额本息还款计划末期不保证还款额固定, 优先按利率和未还本金计算利息.

## 1.0.5

`NEW` 新增还款计划参数: ratePerDay, ratePerMonth, onDay, skipFirst, beginDate.

`NEW` 取整方式的设置支持 proximatePrincipal 和 proximateInterest 的分别设置.

## 1.0.4

完善文档.

## 1.0.3

完善文档.

## 1.0.2

`IMPROVED` 底层数学库默认依赖 [big.js](http://spmjs.io/package/big.js).

## 1.0.1

完善文档.

## 1.0.0

`NEW` 支持还款计划(等额本息, 等额本金, 按月付息到期还本).

`NEW` 支持字符串格式化(千分, 前后缀).

`NEW` 支持取整方式设置(四舍五入, 去尾, 进一).

底层数学库默认依赖 [anima-caculate](http://spmjs.io/package/anima-caculate), 也可选择依赖 [decimal.js](http://spmjs.io/package/decimal.js) 或 [bignumber.js](http://spmjs.io/package/bignumber.js) 或 [big.js](http://spmjs.io/package/big.js).

## 0.0.0

新建仓库, 空内容.
