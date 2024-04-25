class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.base = {
      x, y
    };
    this.size = size;
    this.color = color;
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
      this.y - globalMouse.y,
      globalMouse.x - this.x,
    );
    
    const speed = (Math.log(md)**2) / 10;
    const { cos, sin, atan, atan2 } = Math;
    
    this.x += speed * cos(mtheta);
    this.y += speed * sin(mtheta);
    
    this.draw(ctx);
  }
  
  static particles = [];
}