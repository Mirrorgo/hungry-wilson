# Hungry Wilson
## 功能
饥荒在线模拟锅
> 实现方式
> - 阅读源代码
> - 自己实现简版,怎么好实现怎么来
> - 模仿源码,优化代码
> - 解耦前后端部分,但都放在js中
> - 后端抽离,尝试放在后端


## 代码参考
- 代码
  - 游戏源码
- 文档
  - https://www.zhihu.com/column/c_1298055007057526784


## 源码阅读笔记
- 食材的数据
  - prefabs/veggies
  - prefabs/meats

## 源码的疑问
### 不影响开发
### 影响开发

## 源码的无用代码
高脚鸟蛋的数据在tuning定义了,但是实际上不是使用的这个数据
```lua
-- tuning
TALLBIRDEGG_HEALTH = 15,
TALLBIRDEGG_HUNGER = 15,
TALLBIRDEGG_COOKED_HEALTH = 25,
TALLBIRDEGG_COOKED_HUNGER = 30,
```

实际使用的
```lua
inst.components.edible.healthvalue = TUNING.HEALING_SMALL
inst.components.edible.hungervalue = TUNING.CALORIES_MED
```
cooked
```lua
inst.components.edible.healthvalue = 0
inst.components.edible.hungervalue = TUNING.CALORIES_LARGE
```

