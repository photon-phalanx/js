/**
 * Created by Photon_palanx on 2017/5/18.
 */
/*
* 如其名，迭代器模式，再不暴露对象内部结构的同时，可以顺序访问对象内部的元素
*
* */

function Iterator (items) {
  var length = items.length;
  var index = 0;
  var splice = Array.prototype.splice;
  return {
    first: function () {
      index = 0;
      return items[index];
    },
    last: function () {
      index = length -1;
      return items[index];
    },
    pre: function () {
      if (--index > 0) return items[index];
      else {
        index = 0;
        return null;
      }
    },
    next: function () {
      if (++index < length) return items[index];
      else {
        index = length -1;
        return null;
      }
    },
    get: function (i) {
      index = --i % length;
      if (index < 0) index += length;
      return items[index];
    }
  }
};

var testIterator = Iterator([1,2,3,4,5]);
console.log(testIterator.last());
console.log(testIterator.first());
console.log(testIterator.get(3));
console.log(testIterator.next());