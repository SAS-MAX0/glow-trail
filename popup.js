document.getElementById("saveSettings").addEventListener("click", () => {
  const circleCount = parseInt(document.getElementById("circleCount").value, 10);
  const colorScheme = document.getElementById("colorScheme").value;
  let customCircleColor = null;
  let customBgColor = null;

  if (colorScheme === "custom") {
    customCircleColor = document.getElementById("circleColor").value;
    customBgColor = document.getElementById("bgColor").value;
  }

  const trailPattern = document.getElementById("trailPattern").value;

  chrome.storage.sync.set({ circleCount, colorScheme, customCircleColor, customBgColor, trailPattern }, () => {
    alert("Settings saved! Reload the page to see changes.");
  });
});

document.getElementById("colorScheme").addEventListener("change", (e) => {
  const customColorsDiv = document.getElementById("customColors");
  if (e.target.value === "custom") {
    customColorsDiv.style.display = "block";
  } else {
    customColorsDiv.style.display = "none";
  }
});
