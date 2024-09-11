'use strict';

// Shared state object
const state = {
  selectedColor: 'green',
  selectedRow: 0,
  selectedCol: 0
};

// Fetch and update the canvas
async function fetchAndUpdateCanvas() {
  try {
    const response = await fetch('http://localhost:3003/canvas');
    const data = await response.json();
    const cells = document.querySelectorAll('td');
    data.forEach((row, i) => {
      row.forEach((color, j) => {
        cells[i * 5 + j].style.backgroundColor = color;
      });
    });
  } catch (error) {
    console.error('Error fetching canvas:', error);
  }
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

// Update the selected cell
function updateSelection() {
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => cell.classList.remove('selected'));
  const selectedCell = document.querySelector(`#table tr:nth-child(${state.selectedRow + 1}) td:nth-child(${state.selectedCol + 1})`);
  selectedCell.classList.add('selected');
}

// Handle keydown events
function handleKeydown(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (state.selectedRow > 0) state.selectedRow--;
      break;
    case 'ArrowDown':
      if (state.selectedRow < 4) state.selectedRow++;
      break;
    case 'ArrowLeft':
      if (state.selectedCol > 0) state.selectedCol--;
      break;
    case 'ArrowRight':
      if (state.selectedCol < 4) state.selectedCol++;
      break;
    case 'Enter':
      const selectedCell = document.querySelector(`#table tr:nth-child(${state.selectedRow + 1}) td:nth-child(${state.selectedCol + 1})`);
      selectedCell.style.backgroundColor = state.selectedColor;
      updateCanvas();
      break;
  }
  updateSelection();
}

// Update the canvas on the server
async function updateCanvas() {
  try {
    await fetch('http://localhost:3003/canvas/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getCurrentCanvas())
    });
  } catch (error) {
    console.error('Error updating canvas:', error);
  }
}

// Set up color selection
function setupColorSelection() {
  const selectedColorDiv = document.getElementById('selectedColor');
  selectedColorDiv.style.backgroundColor = state.selectedColor;

  const colors = ['green', 'red', 'blue'];
  colors.forEach(color => {
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
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      cell.style.backgroundColor = state.selectedColor;
      updateCanvas();
    });
  });
}

// Initialize the application
function initialize() {
  fetchAndUpdateCanvas();
  setupColorSelection();
  setupCellClickEvents();
  updateSelection();
  document.addEventListener('keydown', handleKeydown);
}

// Run the initialization
document.addEventListener('DOMContentLoaded', initialize);