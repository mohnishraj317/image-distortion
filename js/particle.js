class Particle {
  constructor(color, x, y, size) {
    this.color = color;
    this.baseColor = color;
    this.x = x;
    this.y = y
    this.baseX = x;
    this.baseY = y;
    this.base = {x, y};
    this.size = size;
    this.system = null;
    this.maxSpeed = 1;
    this.speed = 0;
    this.randomSeed = Math.random() * 2;
    this.friction = .1;
    this.mass = 1;
    this.a = {
      mag: 0, angle: 0
    };
  }
  
  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }
  
  applyForce(mag, angle) {
    this.a.mag = mag / this.mass;
    this.a.angle = angle;
    return 0;
  }
  
  update(ctx, i) {
    // const md = Math.hypot(
    //   this.system.mouse.x - this.x,
    //   this.system.mouse.y - this.y
    // );
    
    // const theta = Math.PI - Math.atan2(
    //   (this.y - this.system.mouse.y),
    //   (this.system.mouse.x - this.x),
    // );
    
    // const speed = (this.randomSeed / Math.log10(md)) + .5;
    // const vx = speed * Math.cos(theta);
    // const vy = speed * Math.sin(theta);
    
    const md = Math.hypot(
      this.system.mouse.x - this.x,
      this.system.mouse.y - this.y
    );
    
    const mtheta = Math.PI - Math.atan2(
      (this.y - this.system.mouse.y),
      (this.system.mouse.x - this.x),
    );
    
    const bd = Math.hypot(
      this.base.x - this.x,
      this.base.y - this.y
    );
    
    const btheta = Math.PI - Math.atan2(
      (this.y - this.base.y),
      (this.base.x - this.x),
    );
    
    const { sin, cos, atan, atan2 } = Math;
    const alpha = btheta - mtheta;
    const theta = atan2(md*sin(alpha)/(bd+md*cos(alpha)), 1);
    // const speed = 1/(Math.log(md)**2);
    this.applyForce(1/Math.log(md), theta);
    
    // const vx = //speed * Math.cos(theta);
    // const vy = //speed * Math.sin(theta);
    if (this.speed < this.maxSpeed)
    this.speed += this.a.mag - this.friction / this.mass;
    else this.speed = this.maxSpeed;
    
    this.x += this.speed * Math.cos(this.a.angle);
    this.y += this.speed * Math.sin(this.a.angle);
    
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
    
    // const view = new Uint32Array(data.buffer)
    
    // for (let i = 0; i < view.length; i += size) {
    //   const x = (i+1) % this.cnv.width;
    //   const y = i / this.cnv.width + 1;
      
    //   const a = (view[i]>>>(8*3)) / 255;
    //   const b = (view[i]<<8)>>>(8*3);
    //   const g = (view[i]<<(8*2))>>>(8*3);
    //   const r = ((view[i]<<(8*3))>>>(8*3));
      
    //   if (a > 0)
    //   this.addParticle(Particle.create(
    //     `rgb(${r},${g},${b})`,
    //     ~~x, ~~y,
    //     10
    //   ));
    // }
    
    this.ctx.restore();
  }
  
  selectParticles(mouse, radius) {
    const selected = [];
    const i = ~~((mouse.x + mouse.y * this.cnv.width / this.particleSize) / this.particleSize);
    selected.push(this.particles[i + 1]);
    return selected;
  }
  
  animate(timestamp) {
    const that = this;
    requestAnimationFrame(that.animate.bind(that));
    fillCtx(this.cnv, "#0002");
    this.particles.forEach((particle, i) => {
      particle.update(this.ctx, i);
    });
  }
}