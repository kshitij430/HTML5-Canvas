"use strict";

// VARIABLES
const canvas = document.querySelector("canvas#draw");
const userMessage = document.querySelector("#userMessage");
const html = document.querySelector("html");
const btnStart = document.querySelector("#btn-start");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 1;
let hue = 0;
let drawing = false;
let lastX;
let lastY;
let direction = true;

// FUNCTION DEFINITION
const draw = function (e) {
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  if (!drawing) return;
  ctx.beginPath();
  // start from path
  ctx.moveTo(lastX, lastY);
  // end path
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
  hue++;

  if (hue > 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth--;
  }
  if (!direction) {
    ctx.lineWidth++;
  }
};

// FUNCTION CALL
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", (e) => {
  drawing = false;
});
canvas.addEventListener("mouseleave", (e) => {
  drawing = false;
});
btnStart.addEventListener("click", (e) => {
  userMessage.classList.add("display");
  canvas.classList.remove("display");
  html.classList.add("cursor");
});
