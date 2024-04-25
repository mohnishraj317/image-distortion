class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.base = {
      x: x, y: y
    };
    this.size = size;
    this.color = color;
    
    this.vx = 0;
    this.vy = 0;
    this.maxSpeed = 20;
    this.mass = innerHeight;
    
    Particle.particles.push(this);
  }
  
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }
  
  update(ctx) {
    const md = Math.hypot(
      globalMouse.x - this.x,
      globalMouse.y - this.y
    );
    
    const mtheta = 2*Math.PI - Math.atan2(
      this.y - globalMouse.y,
      globalMouse.x - this.x,
    );
    
    const bd = Math.hypot(
      globalMouse.x - this.x,
      globalMouse.y - this.y
    );
    
    const btheta = 2*Math.PI - Math.atan2(
      this.y - this.base.y,
      this.base.x - this.x,
    );
    
    const { cos, sin, atan, atan2 } = Math;
    const that = this;
    
    const ax = {
      m: md*cos(mtheta),
      b: bd*cos(btheta),
      
      get tot() {
        return (this.m + this.b) / that.mass;
      }
    };
    
    const ay = {
      m: md*sin(mtheta),
      b: bd*sin(btheta),
      
      get tot() {
        return (this.m + this.b) / that.mass;
      }
    };
    
    const theta = Math.atan2(ay.tot, ax.tot);
    const speed = this.maxSpeed;
    
    const curSpeed = Math.hypot(this.vx, this.vy);
    
    if (curSpeed > speed) {
      this.vx = speed*cos(theta);
      this.vy = speed*sin(theta);
    } else {
      this.vx += ax.tot;
      this.vy += ay.tot;
    }
    
    this.x += this.vx;
    this.y += this.vy;
    
    this.draw(ctx);
  }
  
  static particles = [];
}