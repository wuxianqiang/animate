# 原生JS封装动画

用过jQuery的都知道，jQuery中有提供了一个动画方法，那就是animate方法。这个函数的关键在于指定动画形式及结果样式属性对象。这个对象中每个属性都表示一个可以变化的样式属性（如“height”、“top”或“opacity”）。

jQuery动画的使用方法：

```js
$("#box").animate({left: 500}， 3000);
```

上面是jQuery中的动画方法，那么使用原生JS我们如何封装这样的动画方法呢？

#### 开始封装

```js
function linear(t, b, c, d) {
    return c / d * t + b
}

function tween(element, target, duration, callback) {
    let change = {};
    let begin = {};
    for (let key in target) {
        begin[key] = getCss(element, key);
        change[key] = removeUnit(target[key]) - begin[key];
    }

    let time = 0;
    let timing = setInterval(() => {
        time += 20;
    if (time >= duration) {
        clearInterval(timing);
        for (let key in target) {
            setCss(element, key, target[key]);
        }
        callback && callback.call(element);
        return;
    }
    for (let key in target) {
        let current = linear(time, begin[key], change[key], duration);
        setCss(element, key, current);
    }
}, 20)
}

function getCss(ele, attr) {
    let value = window.getComputedStyle(ele)[attr];
    return removeUnit(value);
}

function removeUnit(value) {
    let reg = /^[-+]?([1-9]\d+|\d)(\.\d+)?(px|pt|em|rem)$/;
    if (isNaN(value) && reg.test(value)) return parseFloat(value);
    if (isNaN(value)) return Number(value);
    return value
}

function setCss(ele, attr, val) {
    let reg = /^(width|height|top|bottom|left|right|(margin|padding)(Top|Left|Bottom|Right)?)$/;
    if (!isNaN(val) && reg.test(attr)) {
        ele.style[attr] = val + "px";
        return;
    }
    ele.style[attr] = val;
}
```

#### 始使用

```js
let box = document.getElementById("box");
tween(box, {left: 500}, 3000);
```

让`id`为`box`的元素匀速运动到距离左侧500像素
