import { Bodies, Composite } from "matter-js";
import 'p5';
import { world, font, fontSize } from "./main";

export class Letter {
  constructor(letter, x, y, density = 0.001) {
    this.char = letter;
    textFont(font);
    this.fontSize = fontSize
    this.bounds = font.textBounds(this.char, x, y + random(-3,3), this.fontSize);
    this.body = Bodies.rectangle(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h, {
      friction: .3,
      density,
      restitution: .7
    });
    textAlign(CENTER, CENTER)
    Composite.add(world, this.body);
    textSize(this.fontSize);

    if (this.bounds.h < 40) {
      this.off = -(this.bounds.h / 2);
    } else {
      this.off = -(this.bounds.h / 4);
    }
    
  }

  isOutOfScreen() {
    const pos = this.body.position;
    return pos.y >= height + 100;
  }

  clear() {
    Composite.remove(world, this.body);
  }

  draw() {
    const pos = this.body.position;
    const angle = this.body.angle; 
    push()
    translate(pos.x, pos.y)
    rotate(angle);
    noFill()
    fill(0);
  
    text(this.char, 0, this.off || 0);
    pop()
  }
}