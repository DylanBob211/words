import { Bodies, Composite, Engine, Runner } from "matter-js";
import "p5";
import fontUri2 from "./assets/KaiseiHarunoUmi-Regular.ttf";
import words from "./assets/words";
import { Word } from "./word";

const engine = Engine.create();
export const world = engine.world;
export const fontSize = 30;
export let font;

let groundData;
let ground;
const wordsArr = [];
engine.timing.timeScale = .6;

function getWordPusher() {
  const wordIterator = (function* () {
    for (let word of words
      .replace(/[.,:;"]/g, "")
      .split("\n")
      .map((v) => (v + " PAUSE").split(" "))
      .reduce((acc, cur) => acc.concat(cur), [])) {
      yield word;
    }
  })();

  let nextRandomWordTiming = engine.timing.timestamp;

  return () => {
    if (engine.timing.timestamp > nextRandomWordTiming) {
      const nextWord = wordIterator.next();
      if (nextWord.value?.length <= 3) {
        nextRandomWordTiming = engine.timing.timestamp + random(150, 250);
      } else {
        nextRandomWordTiming = engine.timing.timestamp + random(250, 350);
      }
      if (!nextWord.done && nextWord.value !== "PAUSE") {
        const isStrong = nextWord.value.includes("*");
        wordsArr.push(
          new Word(
            nextWord.value.replace("*", ""),
            width / 2 - random(100),
            -20,
            isStrong
          )
        );
      }
    }
  };
}

window.preload = function () {
  font = loadFont(fontUri2);
};

window.setup = function () {
  Runner.run(engine);
  createCanvas(720, 720);
  rectMode(CENTER);
  groundData = {
    w: width / 2,
    h: 50,
  };
  ground = Bodies.rectangle(
    width / 2,
    height / 2 + 100,
    groundData.w,
    groundData.h,
    {
      isStatic: true,
      friction: 0.3,
    }
  );
  Composite.add(world, ground);
};

const pushNextWord = getWordPusher();
window.draw = function () {
  pushNextWord();
  background(255);
  wordsArr.forEach((w) => {
    w.draw();
    w.cleanup();
  });
};
