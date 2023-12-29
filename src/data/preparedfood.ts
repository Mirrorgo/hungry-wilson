import { FoodType, HealingValue, HungerValue, SanityValue } from "./tuning";
// 不用于显示,主要用于代码逻辑和give代码,因为实际代码和显示的不一定一样。应该是饥荒版本变更的历史遗留问题

// 因为希望之后可以用for..in迭代且支持反向映射，所以用enum而不是字符串联合类型.另外,希望用自己习惯的命名规则.
enum PreparedFoodKey {
  BaconAndEggs = "baconeggs",
  ButterMuffin = "butterflymuffin",
  Dragonpie = "dragonpie",
  FishTacos = "fishtacos",
  Fishsticks = "fishsticks",
  FistFullOfJam = "jammypreserves",
  FlowerSalad = "flowersalad",
  FroggleBunwich = "frogglebunwich",
  FruitMedley = "fruitmedley",
  Guacamole = "guacamole",
  HoneyHam = "honeyham",
  HoneyNuggets = "honeynuggets",
  IceCream = "icecream",
  Kabobs = "kabobs",
  MandrakeSoup = "mandrakesoup",
  Meatballs = "meatballs",
  MeatyStew = "bonestew",
  Melonsicle = "watermelonicle",
  MonsterLasagna = "monsterlasagna",
  Perogi = "perogies",
  Powercake = "powcake",
  PumpkinCookie = "pumpkincookie",
  Ratatoulle = "ratatoulle",
  SpicyChill = "hotchilli",
  StuffedEggplant = "stuffedeggplant",
  Taffy = "taffy",
  TrailMix = "trailmix",
  TurkeyDinner = "turkeydinner",
  Unagi = "unagi",
  Waffles = "waffles",
  WetGoop = "wetgoop",
}

const preparedfoods: {
  name: PreparedFoodKey;
  priority: number;
  foodType: FoodType;
  health: HealingValue | 0; // 这里类型为负值的适合为什么也不报错？
  hunger: HungerValue | 0;
  sanity: SanityValue | 0;
}[] = [
  {
    name: PreparedFoodKey.ButterMuffin,
    priority: 1,
    foodType: "VEGGIE",
    health: HealingValue.MED,
    hunger: HungerValue.LARGE,
    sanity: SanityValue.TINY,
  },
  {
    name: PreparedFoodKey.FroggleBunwich,
    priority: 1,
    foodType: "MEAT",
    health: HealingValue.MED,
    hunger: HungerValue.LARGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.Taffy,
    priority: 10,
    foodType: "VEGGIE",
    health: -HealingValue.SMALL,
    hunger: HungerValue.SMALL * 2,
    sanity: SanityValue.MED,
  },

  {
    name: PreparedFoodKey.PumpkinCookie,
    priority: 10,
    foodType: "VEGGIE",
    health: 0,
    hunger: HungerValue.LARGE,
    sanity: SanityValue.MED,
  },

  {
    name: PreparedFoodKey.StuffedEggplant,
    priority: 1,
    foodType: "VEGGIE",
    health: HealingValue.SMALL,
    hunger: HungerValue.LARGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.Fishsticks,
    priority: 10,
    foodType: "MEAT",
    health: HealingValue.LARGE,
    hunger: HungerValue.LARGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.HoneyNuggets,
    priority: 2,
    foodType: "MEAT",
    health: HealingValue.MED,
    hunger: HungerValue.LARGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.HoneyHam,
    priority: 2,
    foodType: "MEAT",
    health: HealingValue.MED_LARGE,
    hunger: HungerValue.HUGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.Dragonpie,
    priority: 1,
    foodType: "VEGGIE",
    health: HealingValue.LARGE,
    hunger: HungerValue.HUGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.Kabobs,
    priority: 5,
    foodType: "MEAT",
    health: HealingValue.SMALL,
    hunger: HungerValue.LARGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.MandrakeSoup,
    priority: 10,
    foodType: "VEGGIE",
    health: HealingValue.SUPER_HUGE,
    hunger: HungerValue.SUPER_HUGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.BaconAndEggs,
    priority: 10,
    foodType: "MEAT",
    health: HealingValue.MED,
    hunger: HungerValue.HUGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.Meatballs,
    priority: -1,
    foodType: "MEAT",
    health: HealingValue.SMALL,
    hunger: HungerValue.SMALL * 5,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.MeatyStew,
    priority: 0,
    foodType: "MEAT",
    health: HealingValue.SMALL * 4,
    hunger: HungerValue.LARGE * 4,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.Perogi,
    priority: 5,
    foodType: "MEAT",
    health: HealingValue.LARGE,
    hunger: HungerValue.LARGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.TurkeyDinner,
    priority: 10,
    foodType: "MEAT",
    health: HealingValue.MED,
    hunger: HungerValue.HUGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.Ratatoulle,
    priority: 0,
    foodType: "VEGGIE",
    health: HealingValue.SMALL,
    hunger: HungerValue.MED,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.FistFullOfJam,
    priority: 0,
    foodType: "VEGGIE",
    health: HealingValue.SMALL,
    hunger: HungerValue.SMALL * 3,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.FruitMedley,
    priority: 0,
    foodType: "VEGGIE",
    health: HealingValue.MED,
    hunger: HungerValue.MED,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.FishTacos,
    priority: 10,
    foodType: "MEAT",
    health: HealingValue.MED,
    hunger: HungerValue.LARGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.Waffles,
    priority: 10,
    foodType: "VEGGIE",
    health: HealingValue.HUGE,
    hunger: HungerValue.LARGE,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.MonsterLasagna,
    priority: 10,
    foodType: "MEAT",
    health: -HealingValue.MED,
    hunger: HungerValue.LARGE,
    sanity: -SanityValue.MED_LARGE,
  },

  {
    name: PreparedFoodKey.Powercake,
    priority: 10,
    foodType: "VEGGIE",
    health: -HealingValue.SMALL,
    hunger: 0,
    sanity: 0,
  },

  {
    name: PreparedFoodKey.Unagi,
    priority: 20,
    foodType: "MEAT",
    health: HealingValue.MED,
    hunger: HungerValue.MED_SMALL,
    sanity: SanityValue.TINY,
  },

  {
    name: PreparedFoodKey.WetGoop,
    foodType: "GENERIC",
    priority: -2,
    health: 0,
    hunger: 0,
    sanity: 0,
  },
];

export { preparedfoods };
