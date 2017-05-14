/**
 * Created by Photon_palanx on 17-5-15.
 */
/*
 * 命令模式把一个请求或者操作封装到一个对象中。
 * 命令模式使用不同的请求，队列或者日志参数化其他对象
 * 命令模式也支持可撤销的操作
 * 它减小了代码的耦合度
 * 使得操作和实现分离
 *
 * 不过似乎和策略模式有点像？出发点不同但是实现有相似之处
 * */

var calculate = (function () {
  var current = 0;

  function add (a, b) {
    return a + b;
  }

  function sub (a, b) {
    return a - b;
  }

  function mul (a, b) {
    return a * b;
  }

  function div (a, b) {
    return a / b;
  }

  var Action = {
    add: function (val) {
      current = add(current, val);
    },
    sub: function (val) {
      current = sub(current, val);
    },
    mul: function (val) {
      current = mul(current, val);
    },
    div: function (val) {
      current = div(current, val);
    },
    get: function () {
      return current;
    }
  };
  return function execute (obj) {
    return Action[obj.command].apply(this, obj.args);
  }
})();

calculate({
  command: 'add',
  args: [100]
});

calculate({
  command: 'mul',
  args: [30]
});

var result = calculate({
  command: 'get'
});

console.log(result)