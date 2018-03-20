/**
 * Created by Photon_palanx on 2018/3/19.
 */
/*
  eval有一个规则，对于eval全局变量，它必须保持其原始值，这时候它被调用时的作用域是局部作用域。否则就是全局作用域
  例: eval("a")是局部, (0 ||　eval)("a")/let t = eval t("a")都是全局求值
*/

var a = 1;
(function () {
  var a = 2;
  console.log((0 || eval)('a')); // 1
  console.log(eval('a')); //2
})()