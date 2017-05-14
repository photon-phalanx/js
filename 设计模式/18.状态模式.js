/**
 * Created by Photon_palanx on 2017/5/13.
 */
/*
* 状态模式:对象的内部状态发生改变的时候，会导致行为的改变
* 这个模式是为了解决大量if else判断分支的复杂情况
* */


// 我们以扭蛋机为例，这是java里的一个典型的状态模式的例子
// 扭蛋机有未投币状态，投币状态，售空状态等，在每个状态其实又可以有投币，退币，转旋钮的操作
// 如果用大量的if else 判断状态，则代码很难看，也难以修改，那就以state设计模式来实现

function States () {
  var self = this;
  var states = {
    noCoin: {
      putCoin: function () {
        console.log('成功放入硬币');
        self.currentState = states.hasCoin;
        return self.currentState;
      },
      returnCoin: function () {
        console.log('还未放入硬币，无法返还');
        return self.currentState;
      },
      turnHandles: function () {
        console.log('没有硬币,转了也不出货');
        return self.currentState;
      }
    },
    hasCoin: {
      putCoin: function () {
        console.log('已放入硬币，无法放入');
        return self.currentState;
      },
      returnCoin: function () {
        console.log('成功返还硬币');
        self.currentState = states.noCoin;
        return self.currentState;
      },
      turnHandles: function () {
        console.log('出货啦');
        self.goodsTotal--;
        if (self.goodsTotal > 0) self.currentState = states.noCoin;
        else self.currentState = states.soldOut;
        return self.currentState;
      }
    },
    soldOut: {
      putCoin: function () {
        console.log('售空状态，请不要投币，已退币');
        return self.currentState;
      },
      returnCoin: function () {
        console.log('还未放入硬币，无法返还');
        return self.currentState;
      },
      turnHandles: function () {
        console.log('没有硬币,转了也不出货');
        return self.currentState;
      }
    }
  };
  self.goodsTotal = 10; // 假设10个货物
  self.currentState = states.noCoin;
}

States.prototype = {
  getState: function () {
    return this.currentState;
  }
};

var machine = new States().getState();
machine
  .putCoin()
  .turnHandles()
  .putCoin()
  .returnCoin()
  .turnHandles()
  .putCoin()
  .turnHandles();
/*
 成功放入硬币
 出货啦
 成功放入硬币
 成功返还硬币
 没有硬币,转了也不出货
 成功放入硬币
 出货啦
*/