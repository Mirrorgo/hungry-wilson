# Hungry Wilson
## 功能
饥荒在线模拟锅
> 实现方式
> - 阅读源代码
> - 自己实现简版,怎么好实现怎么来
>     ⭐因为可能随时修改逻辑，第一版先做成读写csv的方式，等代码逻辑彻底跑通后替换成可配置的后台&配置到数据库&离线indexdb
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


## 对代码逻辑的变化
- 最初希望类似源码，且自行优化，把dry和cooked与raw合并，减少做菜的逻辑，然后给食材赋予不同的状态，比如肉，肉干，熟肉，但都属于大肉
- 后来发现很多特殊情况，比如多种肉晒干会变成小肉干
- 还有情况：火鸡大餐只能放入生鸡腿不能是熟的
- so, 只能做一个更详细的数据库/表格，表达各种菜谱的配方
- 新问题 TODO
  - Foliage 只有hm有菜度
- 考虑网络延迟，决定支持离线，so 选择indexDB,localStorage或者service worker的方案
  - 设计4个表
    - 原料表
      - index, code(代码名称), health， sanity , hunger, perish，potable(是否可入锅),type("GENERIC",  "MEAT","VEGGIE"),dlc
    - 原料转化(存的都是原料表的index)和 value（各种东西的值，比如肉度）表    
      - raw(index), cooked(index), dried(index), meatValue,vegetableValue,...,
        - dlc
          - null（ds&all）,hm,rog,sw
    - 菜肴制作表（食谱表） （主要表示做菜相关逻辑，so把dlc也放在这个表中）
      - index,  dlc, 优先级, meatValue([min,max]), 其他各种value的min max, otherCreateWay(一个dsl, 记录剩余的复杂条件)
      - 优化，有没有办法单个值表达两个值，用位运算啥的方式（⭐下面有提到）
        - 位运算在某些场景下能够提供较高的空间效率，但在查询时需要在应用层进行解码操作，这可能会降低一些查询的性能。
        - 如果你对 SQL 查询性能有更高的要求，可以考虑在数据库中采用一种适合 SQL 查询的存储方式。在这种情况下，你可能需要保留 min 和 max 作为独立的列，并使用索引来加速查询
        - so, 最终放弃了位运算优化,采用了存储更多字段的方式
      - 为什么不所有复杂条件都用dsl呢？是为了考虑性能
        - 每次是四个食材做出一个菜肴。这样的话是根据食材的value来筛选出满足条件的菜。如果用dsl的话，我每次需要遍历菜肴的制作方式，并解析所有的制作方式。这样的话性能可能太差了
        - 原本的dsl设计(全dsl)例子
          - meatValue >= 2 && vegetableValue >= 1 && eggValue <= 1 && !('onion' in includedIngredients) && !('garlic' in includedIngredients)
          - 现在只保留后面部分 !('onion' in includedIngredients) && !('garlic' in includedIngredients)
    - 菜肴表
      - index，code, health， sanity , hunger, perish, pot time(制作时间)
    - 最喜欢的食物(多对多)
    - index, foodIndex, personName
  - 特殊情况特殊分析，先额外添加代码逻辑，之后再变成动态配置
- 特例（测试bug）
  - https://dontstarve.fandom.com/wiki/Food#js
  - 作物种子比常规种子回复不一样
  - 熟鸡腿不能做火鸡大餐
  - 高鸟蛋永不腐烂
  - 联机版才有叶肉沙拉菜谱
  - 烤桦木果才可以入锅
⭐STAR
- 因为可能随时修改逻辑，第一版先做成读写csv的方式，等代码逻辑彻底跑通后替换成可配置的后台&配置到数据库&离线indexdb

最后弄一个xml存真实名称? 支持国际化

## 位运算优化
```javascript
// 编码 min 和 max
function encodeMinMax(min, max) {
  const encodingMap = {
    0: 0,
    0.5: 1,
    1: 2,
    1.5: 3,
    2: 4,
    2.5: 5,
    3: 6,
    3.5: 7,
    4: 8
  };

  return encodingMap[min] * 10 + encodingMap[max];
}

// 解码整数为 min 和 max
function decodeMinMax(encodedValue) {
  const decodingMap = {
    0: 0,
    1: 0.5,
    2: 1,
    3: 1.5,
    4: 2,
    5: 2.5,
    6: 3,
    7: 3.5,
    8: 4
  };

  const min = Math.floor(encodedValue / 10);
  const max = encodedValue % 10;

  return { min: decodingMap[min], max: decodingMap[max] };
}

// 示例
const minMaxEncoded = encodeMinMax(1, 2.5);
console.log(minMaxEncoded); // 输出 23

const decodedValues = decodeMinMax(23);
console.log(decodedValues); // 输出 { min: 1, max: 2.5 }

```

👇

```javascript
// 编码 min 和 max
function encodeMinMax(min, max) {
  const encodingMap = {
    0: 0,
    0.5: 1,
    1: 2,
    1.5: 3,
    2: 4,
    2.5: 5,
    3: 6,
    3.5: 7,
    4: 8
  };

  const minCode = encodingMap[min] << 4;
  const maxCode = encodingMap[max];

  return minCode | maxCode;
}

// 解码整数为 min 和 max
function decodeMinMax(encodedValue) {
  const decodingMap = {
    0: 0,
    1: 0.5,
    2: 1,
    3: 1.5,
    4: 2,
    5: 2.5,
    6: 3,
    7: 3.5,
    8: 4
  };

  const minCode = (encodedValue >> 4) & 0b1111;
  const maxCode = encodedValue & 0b1111;

  return { min: decodingMap[minCode], max: decodingMap[maxCode] };
}

// 示例
const minMaxEncoded = encodeMinMax(1, 2.5);
console.log(minMaxEncoded); // 输出 35

const decodedValues = decodeMinMax(35);
console.log(decodedValues); // 输出 { min: 1, max: 2.5 }

```