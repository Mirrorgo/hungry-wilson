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
- 视频
  - b站 "半与半岛" 饥荒代码


## 源码阅读笔记
- 食材的数据
  - prefabs/veggies
  - prefabs/meats
  - preparedfoods
- 为什么meats,egg等和preparedfoods平级而不是单独开一个ingredients
  - 可能是为了扩展性,各种场景可能产生错综复杂的关系,因此这些关系不通过文件夹结构来规范,而是未来通过独立的文件
- 我有四个材料就可以做出某种dish，但是如果材料种类和dish种类太多，我是不是需要遍历dish种类的canbecooked?这样性能也太差了吧
  - so不能弄一堆dish类然后每个类一个cook的函数
- 源码做菜的方式
  - Stewer是锅
  - CalculateRecipe(cooker,材料名称s)
    - local ingdata = GetIngredientValues(prefablist) // 根据name的数组获取 食材的数据
      - GetIngredientValues返回{tags , names}
    - 遍历,如果有非食材,end
  - 存在一个全局的ingredients对象,可以用AddIngredientValues(names, tags, cancook, candry)添加
    - "names"是个数组,tags应该用个对象{},cancook是能否用
    - 比如
      - local fruits = {"pomegranate", "dragonfruit", "cave_banana"}
      - AddIngredientValues(fruits, {fruit=1}, true)
      - AddIngredientValues({"berries"}, {fruit=.5}, true)
      - AddIngredientValues({"durian"}, {fruit=1, monster=1}, true)
      - AddIngredientValues({"honey", "honeycomb"}, {sweetener=1}, true)
    - 独立的AddIngredientValues而不是直接用一个对象数组存可能是为了方便给一类食材添加相同的tag
  - 对于同一个食材,熟不熟的放入锅中效果相同
  - Lua 中没有专门的数组类型，而是使用 tables（表） 来模拟数组的功能
  - 火烤熟的食品一般称为 "Cooked"，而风干的食品则称为 "Dried",烹饪锅里制作的食物通常是指 "Prepared Food"
  - 重要问题,有多个产品dry后都是同一样东西,有多个产品cook后也是同一样东西
    - so cooked-small-meat不可回溯
    - 需要
      - 数组a记录all 食材,包括cooked和未cooked等
        - egg
          - name
          - status: raw
      - object b记录食材之间状态转换的关系
        - egg
- 适合hungry-wilson的设计
  - CalculateRecipe([egg,egg,egg_cooked,eel])
    - cooked的先根据source找源食材 || 本身 看各种tags
  - calculatePreviousEatValue([egg,egg,egg,eel])
  - calculatePreviousTreatValue()
  - AddIngredientValues(names, tags, cancook, candry)

- GetIngredientValues(prefablist)中有一行 "local name = aliases[v] or v" 说明菜品有的地方可能用的别名
代码如下
```lua
--our naming conventions aren't completely consistent, sadly
local aliases=
{
	cookedsmallmeat = "smallmeat_cooked",
	cookedmonstermeat = "monstermeat_cooked",
	cookedmeat = "meat_cooked"
}
```


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

