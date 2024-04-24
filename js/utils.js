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