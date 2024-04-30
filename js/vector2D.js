class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;                                                 }
                                                                get mag() {
    return Math.hypot(this.x, this.y);                          }
                                                                get angle() {                                                   return Math.atan2(this.y, this.x);
  }

  add(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
  }

  addBy(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  dotProd(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  crossProd(vec) {

  }
}

class VectorFL {
  constructor(vec, origin, color) {
    this.vec = vec;
    this.origin = origin;
    this.color = color;

    VectorFL.pool.push(this);
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(...this.origin);
    ctx.lineTo(this.origin[0] + this.vec.x, this.origin[1] + this.vec.y);

    const that = this;

    function drawHead(lineSize=10) {
      const theta = that.vec.angle;
      const initial = [that.origin[0] + that.vec.x, that.origin[1] + that.vec.y];
      ctx.translate(...initial);
      ctx.rotate(theta);
      ctx.moveTo(0, 0);
      ctx.lineTo(-lineSize*Math.cos(Math.PI/6), -lineSize*Math.sin(Math.PI/6));
      ctx.moveTo(0, 0);
      ctx.lineTo(-lineSize*Math.cos(Math.PI/6), lineSize*Math.sin(Math.PI/6));
    }

    drawHead();
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.restore();
  }

  static pool = [];
}