/**
 * Created by Photon_palanx on 2017/5/20.
 */
/*
 * 数据访问对象模式  DAO
 * 这个词后端的人肯定不陌生，hibernate dao肯定用过
 * 它抽象封装对数据源的访问和存储
 * 我们不用知道存储的细节，一次封装，一直受益
 *
 *
 * */

//  相比我在饿了么中用的api层的封装，书上的例子考虑的详细的多，故用书上的例子

function BaseLocalStorage (preId, timeSign) {
  this.preId = preId;
  this.timeSign = timeSign || '|-|';
}
BaseLocalStorage.prototype = {
  status: {
    SUCCESS: 0,
    FAILURE: 1,
    OVERFLOW: 2,
    TIMEOUT: 3
  },
  storage: localStorage || window.localStorage,
  getKey: function (key) {
    return this.preId + key
  },
  set: function (key, value, callback, time) {
    var status = this.status.SUCCESS;
    key = this.getKey(key);
    try {
      time = new Date(time).getTime() || time.getTime();
    } catch (e) {
      // 如果有误，默认一个月
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
    }
    try {
      this.storage.setItem(key, time + this.timeSign + value);
    } catch (e) {
      status = this.status.OVERFLOW;
    }
    callback && callback.call(this, status, key, value);
  },
  get: function (key, callback) {
    var status = this.status.SUCCESS;
    key = this.getKey(key);
    var value = null;
    var timeSignLen = this.timeSign.length;
    var that = this;
    var index;
    var time;
    var result;
    try {
      value = that.storage.getItem(key);
    } catch (e) {
      result = {
        status: that.status.FAILURE,
        value: null
      };
      callback && callback.call(this, result.status, result.value);
      return result;
    }
    if (value) {
      index = value.indexOf(that.timeSign);
      time = window.parseInt(value.slice(0, index));
      if (new Date(time).getTime() > new Date().getTime() || time == 0) {
        value = value.slice(index + timeSignLen);
      } else {
        // 处理过期问题
        value = null;
        status = that.status.TIMEOUT;
        that.remove(key);
      }
    } else {
      status = that.status.FAILURE;
    }
    result = {
      status: status,
      value: value
    };
    callback && callback.call(this, result.status, result.value);
    return result;
  },
  remove: function (key, callback) {
    var status = this.status.FAILURE;
    key = this.getKey(key);
    var value = null;
    try {
      value = this.storage.getItem(key);
    } catch (e) {
    }
    if (value) {
      try {
        this.storage.removeItem(key);
        status = this.status.SUCCESS;
      } catch (e) {
      }
      callback && callback.call(this, status, status > 0 ? null : value.slice(value.indexOf(this.timeSign) + this.timeSign.length))
    }
  }
};