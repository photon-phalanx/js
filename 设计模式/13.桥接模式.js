/**
 * Created by Photon_palanx on 2017/5/10.
 */
/*
* 桥接模式:系统沿着多个维度变化的同时，不增加其复杂度并已达到解耦
* 本质是实现层（如元素的事件）与抽象层（如修饰页面ui逻辑）解耦分离
* 桥接模式是对结构之间的解耦，创建者模式是在乎创建
* 先找到事物的共同点，然后再找到沟通的桥梁，比如给一系列元素设定样式，桥梁为:事件的this即是dom元素
*
* 当然桥接模式会稍微降低性能
* */

// 这是一个最常见的例子
function getBeerById(e) {
    var id = this.id;
    var str = 'http://192.168.1.100/?id=' + id
    // 异步请求
}

addEvent(element, 'click', getBeerById);

// 这是一个例子，但是这个id依赖于this,依赖在这个点击事件了
// 虽然运行没有问题，但是这个函数不再是通用的函数,只能针对特殊场合

function getBererById2(id, callback) {
    var str = 'http://192.168.1.100/?id=' + id
    // 异步请求
}

addEvent(element,'click',function () {
    getBererById2(this.id, callback)
})

// 这个匿名的函数就是一个桥,起到了解耦的作用，同时让函数变的通用