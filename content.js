const coords = { x: 0, y: 0 };

let circleCount = 20;
let trailPattern = 'circle';

let colors = [
  "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e",
  "#ec805d", "#e36e5c", "#df685c", "#d5585c", "#d1525c",
  "#c5415d", "#c03b5d", "#b22c5e", "#ac265e", "#9c155f",
  "#950f5f", "#830060", "#7c0060", "#680060", "#60005f",
  "#48005f", "#3d005e"
];

const rainbowColors = [
  "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"
];

chrome.storage.sync.get(['circleCount', 'colorScheme', 'trailPattern', 'customCircleColor', 'customBgColor'], (data) => {
  if (data.circleCount) circleCount = data.circleCount;
  if (data.trailPattern) trailPattern = data.trailPattern;

  if (data.colorScheme === "custom" && data.customCircleColor) {
    colors = Array(circleCount).fill(data.customCircleColor);
  } else if (data.colorScheme === "rainbow") {
    colors = rainbowColors;
  } else {
    if (data.colorScheme === "warm") {
      colors = [
        "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e",
        "#ec805d", "#e36e5c", "#df685c", "#d5585c", "#d1525c"
      ];
    } else if (data.colorScheme === "cool") {
      colors = [
        "#7ec8f0", "#76c2f5", "#66b1ea", "#50a0e0", "#4990d4",
        "#3588d5", "#1d7ec4", "#006fb2", "#005fa1", "#004f91"
      ];
    }
  }

  for (let i = 0; i < circleCount; i++) {
    const circle = document.createElement("div");
    circle.className = "circle";
    circle.style.backgroundColor = colors[i % colors.length];
    document.body.appendChild(circle);
  }

  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
  });

  window.addEventListener("mousemove", (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
      if (trailPattern === 'circle') {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
      } else if (trailPattern === 'dotted') {
        if (index % 2 === 0) {
          circle.style.left = x - 12 + "px";
          circle.style.top = y - 12 + "px";
        } else {
          circle.style.left = "-9999px";
          circle.style.top = "-9999px";
        }
      } else if (trailPattern === 'spiral') {
        const angle = 0.05 * index;
        const radius = 10 * index;
        circle.style.left = x + radius * Math.cos(angle) - 12 + "px";
        circle.style.top = y + radius * Math.sin(angle) - 12 + "px";
      }

      circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;

      circle.x = x;
      circle.y = y;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();
});
