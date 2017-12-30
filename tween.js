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
