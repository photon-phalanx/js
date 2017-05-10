/**
 * Created by Photon_palanx on 2017/5/10.
 */
/*
* 装饰者模式是说，在不改变原对象的基础上，通过包装扩展，使原有对象可以满足用户的更复杂需求
* 比如在java中的fileInputStream和BufferedInputStream，Buffered加快了速度
* 装饰者模式不用知道原本的实现，而是在上面增添新方法
* 而适配器方法要求对新旧都有了解，才能做适配和改造
*
* 比如经典的火锅类,往里面加基底加调料加菜，不需要知道原来有什么,只要外面继续包装下去就可以了
* */

function decorator(input, fn) {
    var element = document.getElementById(input);
    if (!typeof element.onclick === 'function') element.onclick = fn;
    else {
        var oldFn = element.onclick;
        element.onclick = function () {
            oldFn();
            fn();
        }
    }
}