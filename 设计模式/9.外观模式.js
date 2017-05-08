/**
 * Created by Administrator on 2017/5/8.
 */
/*
* 所谓外观模式,是为一组复杂的子系统接口提供一个更高级的接口,使得访问变得更容易
* 这包括比如浏览器的attachEvent和addEventListener的差异
* 比如 event和window.event
* 比如 preventDefault和returnValue
* 比如 css的不统一
* 比如 点菜的时候给套餐选择,不用自己选等
* */

function addEvent(dom, type, fn) {
  if (dom.addEventListener) {
    dom.addEventListener(type, fn);
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  } else {
    // dom 0级
    dom['on' + type] = fn;
  }
}