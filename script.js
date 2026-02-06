const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttons = document.getElementById("buttons");

const gif = document.getElementById("gif");
const mainText = document.getElementById("mainText");
const card = document.querySelector(".card");

let isSuccess = false;
let isDetached = false;


/* YES CLICK */
yesBtn.addEventListener("click", () => {

  if (isSuccess) return;

  isSuccess = true;

  gif.src = "assets/animation success.gif";

  mainText.textContent =
    "Happy Valentine's Day, Koshka";

  buttons.style.display = "none";
  noBtn.style.display = "none";
});


/* Prepare No button */
function detachNoButton() {

  if (isDetached) return;


  const btn = noBtn.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();


  noBtn.style.position = "absolute";

  noBtn.style.left =
    btn.left - cardRect.left + "px";

  noBtn.style.top =
    btn.top - cardRect.top + "px";


  card.appendChild(noBtn);


  isDetached = true;
}


/* PHYSICS */
document.addEventListener("mousemove", (e) => {

  if (isSuccess) return;


  const btnRect = noBtn.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();


  /* Button center */
  const bx = btnRect.left + btnRect.width / 2;
  const by = btnRect.top + btnRect.height / 2;


  /* Cursor */
  const mx = e.clientX;
  const my = e.clientY;


  const dx = bx - mx;
  const dy = by - my;

  const distance = Math.sqrt(dx * dx + dy * dy);


  const trigger = 100;


  if (distance < trigger) {


    if (!isDetached) {
      detachNoButton();
    }


    /* Force */
    const power =
      (trigger - distance) / trigger * 12;


    /* Normalize */
    const len =
      Math.sqrt(dx * dx + dy * dy) || 1;

    const nx = dx / len;
    const ny = dy / len;


    let x =
      parseFloat(noBtn.style.left);

    let y =
      parseFloat(noBtn.style.top);


    x += nx * power;
    y += ny * power;


    /* Bounds */
    const padding = 16;

    const minX = padding;
    const minY = padding;

    const maxX =
      cardRect.width - btnRect.width - padding;

    const maxY =
      cardRect.height - btnRect.height - padding;


    x = Math.max(minX, Math.min(x, maxX));
    y = Math.max(minY, Math.min(y, maxY));


    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

  }

});
