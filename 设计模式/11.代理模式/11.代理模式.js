/**
 * Created by Photon_palanx on 2017/5/9.
 */
/*
* 代理模式，是为其他对象提供一种代理来控制访问的模式
* 比如一个对象对另一个对象不能直接引用，中间用代理
* 书本的例子是如jsonp的代理
*当我们需要使用的对象很复杂或者需要很长时间去构造，这时就可以使用代理模式(Proxy)
* 很常见的还有虚拟代理，当图片很大的时候，先拿一个提示图片，然后图片慢慢加载
* 一个对象只有有限的访问权限，代理模式(Proxy)可以验证用户的权限
* 代理还可以做缓存等作用等等，至于怎么用，具体问题具体分析
* */

window.onload = function () {
    var myImage = (function () {
        var imgNode = document.createElement('img');
        var container = document.getElementById('container');
        container.appendChild(imgNode);
        return {
            setSrc: function (src) {
                imgNode.src = src;
            }
        }
    })();

    // myImage还是创建图片，但是创建的过程可以找个代理来防止长时间卡顿
    var proxyImage = (function () {
        var img = new Image();
        img.onload = function () {
            // 这里是myImage真正最后的src,为了模拟加载慢，给3秒延时吧
            var self = this;
            setTimeout(function () {
                console.log('img loaded')
                myImage.setSrc(self.src);
            }, 3000);
        };
        return {
            setSrc: function (src) {
                // 这里是代替的能快速显示的图片
                myImage.setSrc("./bg.jpg");
                img.src = src;
            }
        }
    })();

    proxyImage.setSrc('./bg2.jpg');
};
