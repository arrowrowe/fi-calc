var fiCalcs = {
  'decimal.js': require('../index-v-decimal'),
  'anima-caculate': require('../index-v-anima-caculate'),
  'bignumber.js': require('../index-v-bignumber.js'),
  'big.js': require('../index-v-big.js')
};

function init(fiCalc) {
  // 暂时按 optionNew 设置 Money, 执行完 fn 后恢复.
  fiCalc.Money.optionTmp = function (optionNew, fnTmp) {
    var optionOld = fiCalc.Money.option();
    fiCalc.Money.option(optionNew);
    fnTmp();
    fiCalc.Money.option(optionOld);
  };
}

(function () {
  for (var key in fiCalcs) {
    init(fiCalcs[key]);
  }
})();

module.exports = {
  // 逐个测试各依赖版本的 fiCalc
  judge: function (fn) {
    for (var key in fiCalcs) {
      (function (key, fiCalc) {
        fn(key, fiCalc);
      })(key, fiCalcs[key]);
    }
  }
};

