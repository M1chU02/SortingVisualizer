const arrayContainer = document.getElementById("arrayContainer");
let array = [];
let delay = 10;

function generateArray(size = 50) {
  arrayContainer.innerHTML = "";
  array = [];
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 1;
    array.push(value);
    const arrayBar = document.createElement("div");
    arrayBar.classList.add("array-bar");
    arrayBar.style.height = `${value}px`;
    arrayBar.style.width = `${Math.floor(800 / size)}px`;
    arrayContainer.appendChild(arrayBar);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("array-bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }
      await sleep(delay);
      bars[j].style.backgroundColor = "#3498db";
      bars[j + 1].style.backgroundColor = "#3498db";
    }
  }
}

async function selectionSort() {
  const bars = document.getElementsByClassName("array-bar");
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = "green";
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = "red";
      if (array[j] < array[minIndex]) {
        bars[minIndex].style.backgroundColor = "#3498db";
        minIndex = j;
        bars[minIndex].style.backgroundColor = "green";
      }
      await sleep(delay);
      bars[j].style.backgroundColor = "#3498db";
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIndex].style.height = `${array[minIndex]}px`;
    }
    bars[i].style.backgroundColor = "blue";
  }
}

async function insertionSort() {
  const bars = document.getElementsByClassName("array-bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    bars[i].style.backgroundColor = "red";
    await sleep(delay);

    while (j >= 0 && array[j] > key) {
      bars[j + 1].style.height = `${array[j]}px`;
      array[j + 1] = array[j];
      j--;
      await sleep(delay);
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    bars[i].style.backgroundColor = "#3498db";
    bars[j + 1].style.backgroundColor = "blue";
  }
}

function startSorting() {
  const selectedAlgorithm = document.getElementById("algorithmSelector").value;
  delay = 101 - document.getElementById("speedSlider").value;

  switch (selectedAlgorithm) {
    case "bubble":
      bubbleSort();
      break;
    case "selection":
      selectionSort();
      break;
    case "insertion":
      insertionSort();
      break;
  }
}

generateArray();
