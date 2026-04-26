"use strict";

//1
//CoffeeShop
class CoffeeShop {
  constructor(name, menu = []) {
    this.name = name;
    this.menu = menu;
    this.orders = [];
  }

  addOrder(order) {
    if (this.menu.some((item) => item.name === order)) {
      this.orders.push(order);
      return `Order added!`;
    } else {
      return `This item is currently unavailable!`;
    }
  }

  fulfillOrder() {
    if (!this.orders.length) {
      return `All orders have been fulfilled!`;
    } else {
      const [firstElem, ...rest] = this.orders;
      this.orders = rest;
      return `The ${firstElem} is ready!.`;
    }
  }

  listOrders() {
    return this.orders;
  }

  dueAmount() {
    if (!this.orders.length) {
      return 0;
    }

    const orderedMenuItems = this.orders.map((order) =>
      this.menu.find((item) => item.name === order),
    );

    return orderedMenuItems.reduce((acc, curr) => acc + curr.price, 0);
  }

  cheapestItem() {
    this.menu.sort((a, b) => a - b);
    const cheapest = this.menu[this.menu.length - 1];
    return cheapest.name;
  }

  drinksOnly() {
    const grouped = Object.groupBy(this.menu, ({ type }) => type);
    const drinkNames = grouped.drink.map((item) => item.name);

    return drinkNames;
  }

  foodOnly() {
    const grouped = Object.groupBy(this.menu, ({ type }) => type);
    const foodNames = grouped.food.map((item) => item.name);

    return foodNames;
  }
}

let menu = [
  { name: "tuna sandwich", type: "food", price: 2 },
  { name: "ham and cheese sandwich", type: "food", price: 2 },
  { name: "bacon and egg", type: "food", price: 1.7 },
  { name: "steak", type: "food", price: 1.5 },
  { name: "hamburger", type: "food", price: 1.5 },
  { name: "cinnamon roll", type: "food", price: 1.5 },
  { name: "orange juice", type: "drink", price: 1 },
  { name: "lemonade", type: "drink", price: 1.1 },
  { name: "cranberry juice", type: "drink", price: 1.1 },
  { name: "pineapple juice", type: "drink", price: 1.2 },
  { name: "lemon iced tea", type: "drink", price: 1 },
  { name: "vanilla chai latte", type: "drink", price: 1.5 },
  { name: "hot chocolate", type: "drink", price: 1.5 },
  { name: "iced coffee", type: "drink", price: 1 },
];

const tcs = new CoffeeShop("yesCof", menu);

console.log(tcs.addOrder("hot cocoa")); // "This item is currently unavailable!"
// Tesha's coffee shop does not sell hot cocoa
console.log(tcs.addOrder("iced tea")); // "This item is currently unavailable!"
// specifying the variant of "iced tea" will help the process
console.log(tcs.addOrder("cinnamon roll")); // "Order added!"
console.log(tcs.addOrder("iced coffee")); // "Order added!"
console.log(tcs.listOrders()); // ["cinnamon roll", "iced coffee"]
// the list of all the items in the current order
console.log(tcs.dueAmount()); // 2.17
console.log(tcs.fulfillOrder()); // "The cinnamon roll is ready!"
console.log(tcs.fulfillOrder()); // "The iced coffee is ready!"
console.log(tcs.fulfillOrder()); // "All orders have been fulfilled!"
// all orders have been presumably served
console.log(tcs.listOrders()); // []
// an empty array is returned if all orders have been exhausted
console.log(tcs.dueAmount()); // 0.0
console.log(tcs.cheapestItem()); // "lemonade"
console.log(tcs.drinksOnly()); // ["orange juice", "lemonade", "cranberry juice","pineapple juice", "lemon iced tea", "vanilla chai latte", "hot chocolate", "iced coffee"]
console.log(tcs.foodOnly()); // ["tuna sandwich", "ham and cheese sandwich", "bacon and egg", "steak", "hamburger", "cinnamon roll"]
