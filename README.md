# 原生JS封装动画

用过jQuery的都知道，jQuery中有提供了一个动画方法，那就是animate方法。这个函数的关键在于指定动画形式及结果样式属性对象。这个对象中每个属性都表示一个可以变化的样式属性（如“height”、“top”或“opacity”）。

jQuery动画的使用方法：

```js
$("#box").animate({left: 500}， 3000);
```

上面是jQuery中的动画方法，那么使用原生JS我们如何封装这样的动画方法呢？

### 使用方法

```js
let box = document.getElementById("box");
tween(box, left, 500);
```

让`id`为`box`的元素运动到距离左侧500像素
