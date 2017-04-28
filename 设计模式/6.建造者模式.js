/**
 * Created by Photon_palanx on 2017/4/28.
 */
/*
 * 所谓的建造者模式,其实经常用到，只是叫不出名字罢了
 * 建造者模式的思想是吧对象的构建层和表示层分离
 * 也就是经常说的，把大东西拆成小东西，然后组合在一起
 * 相比于工厂模式，建造者模式更多关注产生的细节
 * */
function Human(param) {
    this.hobby = param.hobby;
}

Human.prototype = {
    getHobby: function () {
        return this.hobby;
    }
};

function Named(name) {
    // do something to deal with name
}

function Work(work) {
    var that = this;
    (function (work, that) {
        switch (work) {
            case 'doctor':
                console.log("I am a doctor");
                that.work = 'doctor';
                break;
            case 'teacher':
                console.log("I am a teacher");
                that.work = 'teacher';
                break;
        }
    })(work, that);
}

function Person(params) {
    var _person = new Human(params);
    _person.name = new Named(params.name);
    _person.work = new Work(params.work);
    return _person;
}

var person = new Person({name: 'xt', hobby: 'tennis', work: 'teacher'});
person.getHobby();