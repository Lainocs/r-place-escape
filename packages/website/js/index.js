'use strict';

// Shared state object
const state = {
  selectedColor: 'green'
};

// Fetch and update the canvas
function fetchAndUpdateCanvas() {
  fetch('http://localhost:3003/canvas')
    .then((response) => response.json())
    .then((data) => {
      const cells = document.querySelectorAll('td');
      data.forEach((row, i) => {
        row.forEach((color, j) => {
          cells[i * 5 + j].style.backgroundColor = color;
        });
      });
    });
}

// Get the current canvas state
function getCurrentCanvas() {
  const cells = document.querySelectorAll('td');
  const canvas = [];
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      row.push(cells[i * 5 + j].style.backgroundColor);
    }
    canvas.push(row);
  }
  return canvas;
}

// Set up color selection
function setupColorSelection() {
  const selectedColorDiv = document.getElementById('selectedColor');
  selectedColorDiv.style.backgroundColor = state.selectedColor;

  const colors = ['green', 'red', 'blue'];
  colors.forEach((color) => {
    const colorElement = document.getElementById(color);
    colorElement.addEventListener('click', () => {
      state.selectedColor = color;
      selectedColorDiv.style.backgroundColor = state.selectedColor;
    });
  });
}

// Set up cell click events
function setupCellClickEvents() {
  const cells = document.querySelectorAll('td');
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      cell.style.backgroundColor = state.selectedColor;
      fetch('http://localhost:3003/canvas/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getCurrentCanvas())
      });
    });
  });
}

// Initialize the application
function initialize() {
  fetchAndUpdateCanvas();
  setupColorSelection();
  setupCellClickEvents();
}

// Run the initialization
initialize();