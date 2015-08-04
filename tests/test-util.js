var fiCalc = require('../index');
var Money = fiCalc.Money;

module.exports = {
  // 暂时按 optionNew 设置 Money, 执行完 fn 后恢复.
  option: function (optionNew, fn) {
    var optionOld = Money.option();
    Money.option(optionNew);
    fn();
    Money.option(optionOld);
  }
};

