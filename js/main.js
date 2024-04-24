const globalMouse = {
  x : null, y : null
};
const particleSystem = new ParticleSystem(cnv, globalMouse);

addEventListener("load", () => {
  loadImg("./images/img.jpg")
    .then(img => particleSystem.createParticlesFromImg(img))
    .catch(console.log);
});

addEventListener("touchstart", e => e.stopPropagation());

addEventListener("mousemove", e => {
  e.preventDefault();
  const [x, y] = getClientCoords(e);
  globalMouse.x = x;
  globalMouse.y = y;
});

addEventListener("touchmove", e => {
  e.preventDefault();
  const [x, y] = getClientCoords(e);
  globalMouse.x = x;
  globalMouse.y = y;
});

(function animate() {
  requestAnimationFrame(animate);
  particleSystem.animate();
}());