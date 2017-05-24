/**
 * Created by Photon_palanx on 2017/5/24.
 */
/*
* 简单模板模式，一个很有趣的模式
* 定义似乎是 通过格式化字符串拼凑出现视图，避免创建视图时的大量节点操作，优化内存开销
* 大约是用字符串拼出来，然后用正则替换数字部分，最后把他丢进html里
* 
* */

window.onload = function () {
  var A = {
    root: document.getElementById('container'),
    formatString: function (str, data) {
      return str.replace(/{#(\w+)#}/g, function (match, key) {
        return typeof data[key] === undefined ? '' : data[key];
      })
    },
    listPart: function (data) {
      var s = document.createElement('div');
      var template = [
        '<h1> this is a template create by {#name#} </h1>',
        '<p> 今天的天气是{#weather#}</p>'
      ].join('')
      s.innerHTML = this.formatString(template, data);
      return s;
    },
    init: function (data) {
      this.root.appendChild(this.listPart(data))
    }
  };

  A.init({
    name: 'xiaoT',
    weather: '晴天'
  })
};