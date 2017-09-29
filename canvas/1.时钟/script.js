/**
 * Created by Photon_palanx on 2017/9/29.
 */
let clock = document.querySelector('#clock');
let ctx = clock.getContext('2d');
let {width, height} = ctx.canvas;
let r = width / 2;
let rem = width / 200;
function drawBackground (ctx) {
  ctx.save();
  ctx.translate(r, r);
  ctx.beginPath();
  ctx.lineWidth = 10 *rem;
  ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.stroke();

  let hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  ctx.font = 18 *rem + 'px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  hourNumbers.forEach((number, index) => {
    let rad = 2 * Math.PI / 12 * index;
    let x = Math.cos(rad) * (r - 30 *rem);
    let y = Math.sin(rad) * (r - 30 *rem);
    ctx.fillText(number, x, y);
  });

  for (let i = 0; i < 60; i++) {
    let rad = 2 * Math.PI / 60 * i;
    let x = Math.cos(rad) * (r - 18 *rem);
    let y = Math.sin(rad) * (r - 18 *rem);
    ctx.beginPath(); // 需要重置path
    if (i % 5 !== 0) {
      ctx.fillStyle = '#ccc';
    } else {
      ctx.fillStyle = '#000';
    }
    ctx.arc(x, y, 2 *rem, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}

function drawHour (ctx, r, hour, minute = 0) {
  ctx.save();
  let rad = 2 * Math.PI / 12 * (hour + minute / 60);
  ctx.lineWidth = 6 *rem;
  ctx.lineCap = 'round';
  ctx.rotate(rad);
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(0, -r / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawMinute (ctx, r, minute, second = 0) {
  ctx.save();
  let rad = 2 * Math.PI / 60 * (minute + second / 60);
  ctx.lineWidth = 3 *rem;
  ctx.lineCap = 'round';
  ctx.rotate(rad);
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(0, -r + 30 *rem);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawSecond (ctx, r, second) {
  ctx.save();
  let rad = 2 * Math.PI / 60 * second;
  ctx.lineWidth = 3 *rem;
  ctx.rotate(rad);
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(-2, 20 *rem);
  ctx.lineTo(2, 20 *rem);
  ctx.lineTo(1, -r + 18 *rem);
  ctx.lineTo(-1, -r + 18 *rem);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawDot () {
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}


function draw (ctx, r) {
  ctx.clearRect(0, 0, width, height);
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  drawBackground(ctx);
  drawHour(ctx, r, hour, minute);
  drawMinute(ctx, r, minute, second);
  drawSecond(ctx, r, second);
  drawDot(ctx);
  ctx.restore();
}

setInterval(() => {
  draw(ctx, r);
}, 1000);