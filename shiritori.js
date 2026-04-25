"use strict";

class Shiritory {
  constructor(words) {
    this.words = words || [];
    this.game_over = false;
  }

  play(newWord) {
    if (!this.words.length) {
      this.words.push(newWord);
      return this.words;
    }
    const lastWord = this.words[this.words.length - 1];
    if (!this.words.includes(newWord) && lastWord.at(-1) === newWord.at(0)) {
      this.words.push(newWord);
      return this.words;
    } else {
      this.game_over = true;
      return `game over`;
    }
  }

  restart() {
    this.words = [];
    this.game_over = false;
    return "game restarted.";
  }
}

const myShiritori = new Shiritory();
console.log(myShiritori.play("apple")); // ["apple"]
console.log(myShiritori.play("ear")); // ["apple", "ear"]
console.log(myShiritori.play("rhino")); // ["apple", "ear", "rhino"]
console.log(myShiritori.play("corn")); // "game over"
console.log(myShiritori.words); // ["apple", "ear", "rhino"]
// Words should be accessible.
console.log(myShiritori.restart()); // "game restarted"
console.log(myShiritori.words); // []
// Words array should be set back to empty.
console.log(myShiritori.play("hostess")); // ["hostess"]
console.log(myShiritori.play("stash")); // ["hostess", "stash"]
console.log(myShiritori.play("hostess")); // "game over"
