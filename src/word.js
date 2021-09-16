import { Composite, Composites, Constraint } from "matter-js";
import { Letter } from "./letters";
import { font, fontSize, world } from "./main";

export class Word {
  constructor(str, x, y, isStrong) {
    this.letters = str
      .split("")
      .map((char) => ({ char, w: font.textBounds(char).w }))
      .map(
        (letter, i, chars) =>
          new Letter(letter.char, x + (i * fontSize - 30), y, chars.length * chars.length * (isStrong ? 10 : 1) / 1000)
      );
    // const constraints = [];
    // this.letters.forEach((letter, i, letters) => {
    //   if (letters[i - 1]) {
    //     constraints.push(
    //       Constraint.create({
    //         bodyA: letters[i].body,
    //         bodyB: letters[i - 1].body,
    //         length: fontSize,
    //         stiffness: 0.7,
    //       })
    //     );
    //   }
    // });
    // Composite.add(world, constraints);
  }

  cleanup() {
    this.letters.forEach((l, i) => {
      if (l.isOutOfScreen()) {
        l.clear();
        this.letters.splice(i, 1);
      }
    });
  }

  draw() {
    // const pos = this.body.position;
    // this.body.
    this.letters.forEach((l) => l.draw());
  }
}
