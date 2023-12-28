/* eslint-disable @typescript-eslint/no-unused-vars */

// Name,Health,Hunger,Sanity,Priority,Icon_Path,FoodType
enum FoodType {
  MEAT = "MEAT",
  VEGGIE = "VEGGIE",
}

// Enum for Healing values
enum HealingValue {
  TINY = 1, // Minimal healing value
  SMALL = 3, // Small healing value
  MED_SMALL = 8, // Medium-small healing value
  MED = 20, // Medium healing value
  MED_LARGE = 30, // Medium-large healing value
  LARGE = 40, // Large healing value
  HUGE = 60, // Huge healing value
  SUPER_HUGE = 100, // Super huge healing value
}

// Enum for Sanity values
enum SanityValue {
  SUPER_TINY = 1, // Super tiny sanity value
  TINY = 5, // Tiny sanity value
  SMALL = 10, // Small sanity value
  MED = 15, // Medium sanity value
  MED_LARGE = 20, // Medium-large sanity value
  LARGE = 33, // Large sanity value
  HUGE = 50, // Huge sanity value
}

const calories_per_day = 75;

// Enum for Calorie values
// 下面这部分奇怪的注释来自源代码
enum CalorieValue {
  TINY = calories_per_day / 8, // berries
  SMALL = calories_per_day / 6, // veggies
  MED_SMALL = calories_per_day / 4,
  MED = calories_per_day / 3, // meat
  LARGE = calories_per_day / 2, // cooked meat
  HUGE = calories_per_day, // crockpot foods?
  SUPER_HUGE = calories_per_day * 2, // crockpot foods?
}
