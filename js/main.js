const globalMouse = {
  x : null, y : null
};

addEventListener("mousemove", e => {
  const [x, y] = getClientCoords(e);
  globalMouse.x = x;
  globalMouse.y = y;
});

addEventListener("touchmove", e => {
  const [x, y] = getClientCoords(e);
  globalMouse.x = x;
  globalMouse.y = y;
});

const dummy = new Particle(
  200, 200, 20, "royalblue"
);

(function animate() {
  requestAnimationFrame(animate);
  fillCtx(cnv, "#0002");
  
  Particle.particles.forEach(particle => {
    particle.update(getctx(cnv));
  });
}());