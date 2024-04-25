const globalMouse = {
  x : null, y : null
};
const particleSystem = new ParticleSystem(cnv, globalMouse);

addEventListener("load", () => {
  loadImg("./images/img.jpg")
    .then(img => particleSystem.createParticlesFromImg(img))
    .catch(console.log);
});

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

particleSystem.animate(0);