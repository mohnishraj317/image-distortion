class Particle {
  constructor(color, x, y, size) {
    this.color = color;
    this.baseColor = color;
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.base = {x, y};
    this.size = size;
    this.system = null;
    this.maxSpeed = 1;
    this.speed = 0;
    this.thresRadius = 20;
    this.randomSeed = Math.random() * 2;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }
  
  update(ctx, i) {
    this.draw(ctx);
    
    const md = Math.hypot(
      this.system.mouse.x - this.x,
      this.system.mouse.y - this.y
    );
    
    const theta = Math.PI - Math.atan2(
      (this.y - this.system.mouse.y),
      (this.system.mouse.x - this.x),
    );
    
    const speed = (this.randomSeed / Math.log10(md)) + .5;
    const vx = speed * Math.cos(theta);
    const vy = speed * Math.sin(theta);
    
    this.x += vx;
    this.y += vy;
  }

  static create = (...args) => new Particle(...args);
}

class ParticleSystem {
  constructor(cnv, mouse) {
    this.cnv = cnv;
    this.ctx = cnv.getContext("2d") 
    this.particles = [];
    this.particleSize = ~~(this.cnv.width / 60);
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