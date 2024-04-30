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

async function loadImg(src) {
  const img = new Image;
  img.src = src;
  
  return new Promise((res, rej) => {
    img.addEventListener("load", () => res(img));
    img.addEventListener("error", () => rej());
  });
}

function getClientCoords(e) {
  let {clientX: x, clientY: y} = e.touches ? e.touches[0] : e;
  
  return [~~x, ~~y];
}