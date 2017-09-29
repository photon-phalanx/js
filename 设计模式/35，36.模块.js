/**
 * Created by Photon_palanx on 2017/6/2.
 */
/*
 * 异步模块模式AMD之前，当然还有同步模块模式
 * 同步模块的代码较为简单，如string.trim 这样的模块对应的就是{string:{trim:{}}}这样的结构
 * 维护一个define定义模块，维护一个module取得模块
 * module的最后利用fn.apply(null, modules); (当然null不太好)
 * 使用的话则是F.module('string.trim',function(trim){}) 这样的用法
 * 第一个参数可以是数组，也可以有多个模块的参数，最后的回调函数的形参对应前面的顺序
 *
 * 当然，异步模式可能显得更为重要，下面实现一个异步模式
 * */


(function (F) {
  var moduleCache = {};
  function getUrl (moduleName) {
    // lib/ajax 变成lib/ajax.js
    return String(moduleName).replace(/\.js$/g, '') + '.js'
  }

  function loadScript (src) {
    var _script = document.createElement('script');
    _script.type = 'text/javaScript';
    _script.charset = 'UTF-8';
    _script.async = true;
    _script.src = src;
    document.getElementsByTagName('head')[0].appendChild(_script);0
  }
  function setModule (moduleName, params, callback) {
    var _module, fn;
    if (moduleCache[moduleName]) {
      _module = moduleCache[moduleName];
      _module.status = 'loaded';
      _module.exports = callback ? callback.apply(_module, params) : null;
      while (fn = _module.onload.shift()) {
        fn(_module.exports)
      }
    } else {
      callback && callback.apply(null, params);
    }
  }
  function loadModule (moduleName, callback) {
    var _module;
    if (moduleCache[moduleName]) {
      _module = moduleCache[moduleName];
      if (_module.status === 'loaded') {
        // 这个很重要，loadModule一定是异步的，effectiveJS 上的某一条建议有写，永远不要同步的调用异步函数，这非常重要
        setTimeout(callback(_module.exports), 0);
      } else {
        // 加载完成的时候调用
        _module.onload.push(callback);
      }
    } else {
      // 第一次加载
      moduleCache[moduleName] = {
        moduleName: moduleName,
        status: 'loading',
        exports: null,
        onload: [callback]
      };
      loadScript(getUrl(moduleName));
    }
  }

  // 模块的url， 模块的依赖， 模块的callback
  F.module = function (url, modDeps, modCallback) {
    var args = Array.prototype.slice.call(arguments),
      callback = args.pop(),
      deps = (args.length && args[args.length - 1] instanceof Array) ? args.pop() : [],
      url = args.length ? args.pop() : null,
      params = [],
      depsCount = 0,
      i = 0,
      len = deps.length;
    // 如果存在依赖
    if (len) {
      for (i = 0; i < len; i++) {
        // 这样的写法已经可以被es6的let替换了，包括前面的Array.prototype.slice.call的写法也可以用array.from
        (function (i) {
          depsCount++;
          // 这是一个异步加载的过程,depsCount保存的是加载中的模块，所以加载前++，等加载完后--
          // 另外，loadModule是异步的，for循环的时候就会全部++，而回调会在for结束后才有可能调用
          loadModule(deps[i], function (mod) {
            params[i] = mod;
            depsCount--;
            if (depsCount === 0) {
              // 这个在模块缓存中修正状态
              setModule(url, params, callback);
            }
          })
        })(i);
      }
    } else {
      setModule(url, [], callback);
    }
  }
})(function () {
  // 这个函数创建了模块管理器F,并且把它加到了全局变量上，这个F也会传给闭包的形参
  return window.F = {};
});


/*
* 使用方式*/
// 在lib/dom里写以下代码
F.module('lib/dom',function () {
  return {
    g: function (id) {
      return document.getElementById(id);
    },
    html: function (id, html) {
      if(!html) return this.g(id).innerHTML;
      else {
        this.g(id).innerHTML = html;
      }
    }
  }
});

// 在lib/event里写以下代码
F.module('lib/event', ['lib/dom'], function (dom) {
  return {
    on: function (id, type, fn) {
      dom.g(id)[on + 'type'] = fn;
    }
  }
});

// 在mainScript中使用他们
F.module(['lib/event', 'lib/dom'], function (event, dom) {
  events.on('demo', 'click', function () {
    dom.html('demo', 'success');
  })
});

/*
看了好多遍才理解这个……真是很厉害……
跟着代码走一遍，看看流程到底是怎样的
首先这个代码是说 在lib下面有2个文件，dom和event，然后相当于页面里有一个代码加载他们
看主线代码，['lib/event', 'lib/dom']，这是要加载2个依赖，所以在module函数里，走if里面的代码，做loadModule
loadModule先去加载event,这是第一次接在，走loadModule的else语句，所以在cache里创建了一个event的项
目前的代码还是
 {
 moduleName: 'lib/event',
 status: 'loading',
 exports: null,
 onload: [callback] 这个callback是loadModule的callback
 }
 然后去用了loadScript 这部分代码到此完结
 同样 dom部分也做一遍，完结了

 那么，这剩下的代码是怎么做的，它是怎么完成调用的呢
 是loadScript去加载了event这个文件，放到了head标签里
 这时候就会去做event这个文件的内容
 做的是什么，event里写的是F.module('lib/event', ['lib/dom']………………这样的一段，所以开始做这段代码

 这段代码说需要有dom的依赖，所以又做loadModule
 但是因为刚刚已经缓存过这个了，所以做if语句里的，我们假设这时候dom还没加载完
 那么，就做了else的，把callback添加到onload里 这个callback是loadModule的callback
 注意不要搞混，这个module里的变量是不和刚刚的主函数里的module里的变量共享的，所以完成计数depsCount是不共享的
 但是loadModule的回调函数是添加在moduleCache中的，这个是共享的
 同样，loadScript也去做了加载dom的一遍

 现在,开始加载dom了，所以做dom里的语句，F.module
 这里没有依赖，直接做else的setModule
 虽然F.module里的局部变量不是共享的，但是moduleCache这东西是共享的
 所以在setModule中moduleCache里有它，就改变了状态，同时将exports改成了dom里定义的return的对象
 然后做了onload的回调函数，这个回调函数是loadModule的哦
 loadModule的回调被调用，依赖交给params，depsCount--，这时候对于event来说，依赖全部完成了，开始做event的setModule

 同样，event的setModule让自己的状态变成loaded，并且触发moduleCache('lib/event')里的onload
 这时候dom和event都减为0了，所以主流程里的setModule被调用

 主流程并没有模块名(匿名模块),在setModule里走else语句
 也就是直接执行函数，所以完成了

 有点复杂……很厉害啊

*/