# 第一版
> 做出巨人国锅一样的功能,也就是什么菜能制作什么吃的,且 0 bug
- 原料表
  - index, code(代码名称), health， sanity , hunger, potable(是否可入锅,Boolean),type("GENERIC",  "MEAT","VEGGIE")
- 菜肴表
    - index，code
- 菜肴制作表（食谱表） （主要表示做菜相关逻辑，so把dlc也放在这个表中）
    - index, 优先级,  minMeatValue, maxMeatValue , 其他各种value的min max, otherCreateWay(一个dsl, 记录剩余的复杂条件)