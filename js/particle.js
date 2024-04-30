class Particle {
  constructor(color, x, y, size) {
    this.color = color;
    this.size = size;
    this.system = null;
    this.mass = innerHeight + (Math.random() * (innerHeight / 2) - (innerHeight / 2));

    this.x = x;
    this.y = y;
    this.base = {x, y};
    
    this.vx = 0;
    this.vy = 0;
    
    this.ax = 0;
    this.ay = 0;
    
    this.k = 5;
    this.b = 50;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    ctx.restore();
  }
  
  update(ctx, i) {
    const { cos, sin, atan, atan2 } = Math;
    const that = this;
    
    const speed = this.maxSpeed;
    const curSpeed = Math.hypot(this.vx, this.vy);
    
    let md = Math.hypot(
      globalMouse.x - this.x,
      globalMouse.y - this.y
    )/10;
    
    const mtheta = Math.PI + Math.atan2(
      globalMouse.y - this.y,
      globalMouse.x - this.x,
    );
    
    md = this.mass*10/(2*md+1);
    // md = this.mass*cos(mtheta);
    // md = this.mass*atan2(1, md);
    
    let bd = Math.hypot(
      this.base.x - this.x,
      this.base.y - this.y
    );
    bd = this.k * bd;
    
    const btheta = Math.atan2(
      this.base.y - this.y,
      this.base.x - this.x,
    );
    
    const d = this.b * curSpeed;
    const dtheta = Math.PI + atan2(this.vy, this.vx);
    
    const a = [
          [bd, btheta],
          [d, dtheta],
          [md || 0, mtheta || 0]
        ];
    
    this.ax = ~~a.map(arg => arg[0] * cos(arg[1])).reduce((a, b) => a + b, 0) / this.mass;
    this.ay = ~~a.map(arg => arg[0] * sin(arg[1])).reduce((a, b) => a + b, 0) / this.mass;
    
    const theta = Math.atan2(this.ay, this.ax);
  
    this.vx += this.ax;
    this.vy += this.ay;
    
    this.x += this.vx;
    this.y += this.vy;
    
    this.draw(ctx);
  }

  static create = (...args) => new Particle(...args);
}

class ParticleSystem {
  constructor(cnv, mouse) {
    this.cnv = cnv;
    this.ctx = cnv.getContext("2d") 
    this.particles = [];
    this.particleSize = ~~(this.cnv.width / 50);
    this.mouse = mouse;
    this.currAnim = null;
  }
  
  start(img) {
    this.particles.length = 0;
    this.createParticlesFromImg(img);
    cancelAnimationFrame(this.currAnim);
    this.animate(0);
  }
  
  addParticle(p) {
    p.system = this;
    this.particles.push(p);
  }
  
  createParticlesFromImg(img) {
    this.ctx.save();
    this.ctx.drawImage(img, 0, 0, cnv.width, cnv.height);
    const { data } = this.ctx.getImageData(0, 0, cnv.width, cnv.height);
    this.ctx.clearRect(0, 0, cnv.width, cnv.height);
    const size = this.particleSize;
    
    for (let y = 0; y < this.cnv.height; y += size)
      for (let x = 0; x < this.cnv.width; x += size) {
        const i = ~~(4 * (x + y * cnv.width));
        
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3] / 255;
        
        if (a > 0)
          this.addParticle(Particle.create(
            `rgba(${r},${g},${b},${a})`,
            ~~x, ~~y,
            size
          ));
      }
    
    this.ctx.restore();
  }
  
  animate(timestamp) {
    const that = this;
    this.currAnim = requestAnimationFrame(that.animate.bind(that));
    fillCtx(this.cnv, "#000");
    
    this.particles.forEach((particle, i) => {
      particle.update(this.ctx, i);
    });
  }
}