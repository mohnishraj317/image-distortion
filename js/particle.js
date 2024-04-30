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
    this.maxSpeed = 12;
    this.mass = innerHeight;
    this.k = 5;
    this.b = 1;
    
    this.ax = 0;
    this.ay = 0;
    
    Particle.particles.push(this);
    const that = this;
    
    this.vecs = {
      vel: new Vector(that.vx, that.vy),
      acc: new Vector(that.ax, that.ay),
      d: new Vector(0,0),
      b: new Vector(0,0),
      m: new Vector(0,0)
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x-this.size/2, this.y-this.size/2, this.size, this.size);
    ctx.restore();
  }
  
  update(ctx) {
    const { cos, sin, atan, atan2 } = Math;
    const that = this;
    
    const speed = this.maxSpeed;
    const curSpeed = Math.hypot(this.vx, this.vy);
    
    let md = Math.hypot(
      globalMouse.x - this.x,
      globalMouse.y - this.y
    );
    
    md = innerHeight*10/md;
    
    const mtheta = Math.PI + Math.atan2(
      globalMouse.y - this.y,
      globalMouse.x - this.x,
    );
    
    let bd = Math.hypot(
      this.base.x - this.x,
      this.base.y - this.y
    );
    bd = this.k*bd;
    
    const btheta = Math.atan2(
      this.base.y - this.y,
      this.base.x - this.x,
    );
    
    const d = this.b*curSpeed;
    const dtheta = Math.PI + atan2(this.vy, this.vx);//Math.PI + btheta;
    
    const a = [
      [bd, btheta],
      [d, dtheta],
      [md, mtheta]
    ];
    
    this.ax = ~~a.map(arg => arg[0]*cos(arg[1])).reduce((a, b) => a + b, 0) / this.mass;
    this.ay = ~~a.map(arg => arg[0]*sin(arg[1])).reduce((a, b) => a + b, 0) / this.mass;
    
    const theta = Math.atan2(this.ay, this.ax);
    
    // if (curSpeed > speed) {
    //   this.vx = speed*cos(theta);
    //   this.vy = speed*sin(theta);
    // } else {
    //   this.vx += this.ax;
    //   this.vy += this.ay;
    // }
    
    this.vx += this.ax;
    this.vy += this.ay;
    
    this.x += this.vx;
    this.y += this.vy;
    
    Object.entries(this.vecs).forEach(([name, vec]) => {
      switch (name) {
        case "vel" :
          vec.x = that.vx * 10;
          vec.y = that.vy * 10;
          break;
        
        case "acc" :
          vec.x = that.ax * that.mass;
          vec.y = that.ay * that.mass;
          break;
        
        case "d" :
          vec.x = d*cos(dtheta);
          vec.y = d*sin(dtheta);
          break;
          
        case "b":
          vec.x = bd * cos(btheta);
          vec.y = bd * sin(btheta);
          break;
        
        case "m":
          vec.x = md*cos(mtheta);
          vec.y = md*sin(mtheta);
          break;
      }
    });
    
    this.draw(ctx);
  }
  
  static particles = [];
}

