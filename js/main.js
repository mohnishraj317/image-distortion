const globalMouse = {
  x : undefined, y : undefined
};
const cnv = document.querySelector(".cnv");

const particleSystem = new ParticleSystem(cnv, globalMouse);

addEventListener("load", () => {
  resizeCanvas(cnv, innerHeight, innerWidth);
  loadImg("./images/img.jpg")
    .then(img => particleSystem.start(img))
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

addEventListener("touchend", () => {
  globalMouse.x = undefined;
  globalMouse.y = undefined;
});

addEventListener("resize", () => {
  resizeCanvas(cnv, innerHeight, innerWidth);
});