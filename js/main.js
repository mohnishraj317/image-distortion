const globalMouse = {
  x : null, y : null
};

addEventListener("mousemove", e => {
  const [x, y] = getClientCoords(e);
  globalMouse.x = x;
  globalMouse.y = y;
  
  finger.x = x;
  finger.y = y;
});

addEventListener("touchmove", e => {
  const [x, y] = getClientCoords(e);
  globalMouse.x = x;
  globalMouse.y = y;
  
  finger.x = x;
  finger.y = y;
});

const dummy = new Particle(
  200, 200, 20, "royalblue"
);

const base = new Particle(
  200, 200, 2, "red"
);

const finger = new Particle(
  0, 0, 5, "lime"
);

base.mass = finger.mass = Infinity;

(function animate() {
  requestAnimationFrame(animate);
  fillCtx(cnv, "#00000002");
  
  Particle.particles.forEach(particle => {
    particle.update(getctx(cnv));
  });
}());