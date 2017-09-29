/**
 * Created by Photon_palanx on 2017/6/1.
 */
/*
* 唔……一个自己实现的promise……
* es6已经有自己的promise方法了
* 而且这个promise不是符合规范的
* 但是对了解异步思想有帮助，那就走一遍~
* */


/*
有点长，这是一个waiter,里面包括了promise
对外不用关注细节，基本上就是说，我们用waiter.Deferred 创建一个对象，这个对象有reject和resolve方法
当异步的事情完成后调用这2个方法，然后这个对象需要放到waiter.when里面去就可以了

对内来说，当调用resolve的时候，检查是不是所有的都resolve了，如果是，执行回调
当当用reject的时候，直接取消观察一切，并且执行回调
*/
function Waiter () {
  // 注册的容器,他们都有异步的事情，当他们的事情都做完后，执行回调
  var dfd = [],
    // 成功的回调
    doneArr = [],
    // 失败的回调
    failArr = [],
    slice = Array.prototype.slice,
    that = this;
  var Promise = function () {
    this.resolved = false;
    this.rejected = false;
  };
  Promise.prototype = {
    resolve: function () {
      this.resolved = true;
      // 应该可以没有这句把，没有监控对象……那说明是即时resolve 也挺好啊，类似于es6的 Promise.resolve
      // if (!dfd.length) return;
      for (var i = dfd.length -1; i >= 0; i--) {
        // 与比或优先级高，这里是说如果失败或者还没有resolved的话，就返回
        if (dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
          return;
        }
        dfd.splice(i ,1);
      }
      // 到这里数组肯定为0了，不为0的话前面return了或者还在循环
      _exec(doneArr);
    },
    reject: function () {
      this.rejected = true;
      if (!dfd.length) return;
      // 失败清除全部监控对象
      dfd.splice(0);
      _exec(failArr);
    }
  };
  that.Deferred = function () {
    return new Promise();
  };
  function _exec (arr) {
    var i = 0,len = arr.length;
    for(; i < len; i++) {
      try {
        arr[i] &&arr[i]();
      } catch(e) {}
    }
  }
  that.when = function () {
    dfd = slice.call(arguments);
    var i = dfd.length;
    for(--i; i>=0; i--) {
      if (!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof  Promise) {
        dfd.splice(i, 1);
      }
    }
    return that;
  };
  that.done = function () {
    doneArr = doneArr.concat(slice.call(arguments));
    return that;
  };
  that.fail = function () {
    failArr = failArr.concat(slice.call(arguments));
    return that;
  }
}

var waiter = new Waiter();
function first (waiter) {
  var dtd = waiter.Deferred();
  setTimeout(function () {
    console.log('first finish');
    dtd.resolve();
  }, 500);
  return dtd;
}

function second (waiter) {
  var dtd = waiter.Deferred();
  setTimeout(function () {
    console.log('second finish');
    dtd.resolve();
  }, 2000);
  return dtd;
}

waiter.when(first(waiter), second(waiter)).done(function () {
  console.log('all finished');
});