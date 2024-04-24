const cnv = document.querySelector(".cnv");
const getctx = cnv => cnv.getContext("2d");

const resizeCanvas = (cnv, h, w) => {
  cnv.width = w;
  cnv.height = h;
}

const fillCtx = (cnv, color = "black") => {
  const ctx = getctx(cnv);

  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.restore();
}
addEventListener("load", () => {
  resizeCanvas(cnv, innerHeight, innerWidth);
});

addEventListener("resize", () => {
  resizeCanvas(cnv, innerHeight, innerWidth);
});