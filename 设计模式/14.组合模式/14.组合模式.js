/**
 * Created by Photon_palanx on 2017/5/10.
 */
/*
 * 组合模式，又称部分－整体的模式，一个整体有多个部分组成，他们组成了一个树形结构
 * 操作整体自然是复杂的，有时候，我们不想知道内部包括了什么，但是又想保持简易的操作，于是就有了组合模式
 * */

// 以一个表单为例,每个元素都实现了自己的添加子元素的方法，以及初始化自己需要的变量作为构造的参数传入
// 那么，使用的时候只要按照格式，就能完成子元素的添加
// 只要保证添加子元素的部分正确，自身的构造正确，那最后应该就是正确的
// 这样也利于debug

function inheritObj(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
}

function inheritPrototype(SubClass, SuperClass) {
    var p = inheritObj(SuperClass.prototype);
    p.constructor = SubClass;
    SubClass.prototype = p;
}


function FormElement() {
    this.children = []
    this.element = ''
}

FormElement.prototype = {
    init: function () {
        throw new Error('请实现它');
    },
    add: function () {
        throw new Error('请实现它');
    },
    getElement: function () {
        throw new Error('请实现它');
    }
};

function FormItem(id, fatherNode) {
    FormElement.call(this);
    this.parent = fatherNode;
    this.id = id;
    this.init()
}

inheritObj(FormItem, FormElement)
FormItem.prototype.init = function () {
    this.element = document.createElement('form');
    this.element.id = this.id;
};
FormItem.prototype.getElement = function () {
    return this.element;
};
FormItem.prototype.add = function (child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
};
FormItem.prototype.show = function () {
    this.parent.appendChild(this.getElement());
};


function FieldsetItem(className, text) {
    FormElement.call(this);
    this.text = text;
    this.className = className;
    this.init()
}

inheritObj(FieldsetItem, FormElement)
FieldsetItem.prototype.init = function () {
    this.element = document.createElement('div');
    this.element.className = this.className;
};
FieldsetItem.prototype.getElement = function () {
    return this.element;
};
FieldsetItem.prototype.add = function (child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
};


function Group() {
    FormElement.call(this);
    this.init()
}

inheritObj(Group, FormElement)
Group.prototype.init = function () {
    this.element = document.createElement('div');
};
Group.prototype.getElement = function () {
    return this.element;
};
Group.prototype.add = function (child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
};


function SpanItem(text) {
    FormElement.call(this);
    this.text = text;
    this.init()
}

inheritObj(SpanItem, FormElement)
SpanItem.prototype.init = function () {
    this.element = document.createElement('span');
    this.element.innerHTML = this.text
};
SpanItem.prototype.getElement = function () {
    return this.element;
};
SpanItem.prototype.add = function (child) {
};


function InputItem(className) {
    FormElement.call(this);
    this.className = className;
    this.init()
}

inheritObj(InputItem, FormElement)
InputItem.prototype.init = function () {
    this.element = document.createElement('input');
    this.element.className = this.className
};
InputItem.prototype.getElement = function () {
    return this.element;
};
InputItem.prototype.add = function (child) {
};

window.onload = function () {
    var form = new FormItem('FormItem', document.body);
    form.add(
        new FieldsetItem('account', '帐号').add(
            new Group().add(
                new SpanItem('用户名')
            ).add(
                new InputItem('user_name')
            ).add(
                new SpanItem('4-6位数字或字母')
            )
        ).add(
            new Group().add(
                new SpanItem('密&nbsp;码')
            ).add(
                new InputItem('user_password')
            ).add(
                new SpanItem('6-12位数字或者密码')
            )
        )
    ).show();
};