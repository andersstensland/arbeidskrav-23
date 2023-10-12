// gathering-army.js
import warriors from "./modules/warriors.js";
import animals from "./modules/animals.js";
import warMachines from "./modules/warMachines.js";

// Function to buy an item
const buyItem = (item) => {
  const requiredGold = item.priceGold || 0;
  const requiredMetal = item.priceMetal || 0;
  const requiredWood = item.priceWood || 0;

  const currentGold = parseInt(localStorage.getItem("gold-count")) || 0;
  const currentMetal = parseInt(localStorage.getItem("metal-count")) || 0;
  const currentWood = parseInt(localStorage.getItem("wood-count")) || 0;

  console.log(currentGold, currentMetal, currentWood);

  if (
    currentGold >= requiredGold &&
    currentMetal >= requiredMetal &&
    currentWood >= requiredWood
  ) {
    // Deduct the required resources
    localStorage.setItem("gold-count", currentGold - requiredGold);
    localStorage.setItem("metal-count", currentMetal - requiredMetal);
    localStorage.setItem("wood-count", currentWood - requiredWood);

    // Store the bought item in local storage
    try {
      storeBoughtItem(item);
    } catch (error) {
      alert(error.message);
      return;
    }

    // Display confirmation alert (you may customize this part)
    alert(`You have successfully bought ${item.categoryName}!`);
  } else {
    alert(`Insufficient resources to buy ${item.categoryName}.`);
  }
};

// Function to store bought items in local storage
const storeBoughtItem = (item) => {
  // Get the array of bought items from local storage
  const boughtItems = JSON.parse(localStorage.getItem("boughtItems")) || [];

  // Add the newly bought item to the array
  boughtItems.push(item);

  // Check the type of the item
  console.log(item.type);

  // Save the updated array back to local storage
  localStorage.setItem("boughtItems", JSON.stringify(boughtItems));
};

// Function to display warriors
const displayWarriors = (warriors) => {
  const warriorsOutput = document.querySelector(".warriors-output");

  warriors.forEach((warrior, index) => {
    // Create container for each warrior
    const warriorContainer = document.createElement("div");
    warriorContainer.className =
      "rounded-md border border-gray-300 overflow-hidden";

    // Create inner content
    const content = `
      <div class="flex flex-col justify-between px-4 py-2 min-h-full">
        <h3 class="text-lg text-center mb-2">${warrior.categoryName}</h3>
        <img src="images/${warrior.image}" alt="" class="w-24 mx-auto mb-2" />
        <div class="flex justify-center items-center"> 
        <button class="flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 w-6/12 rounded-full buy-button"
          data-index="${index}" data-type="warrior">
          Buy Warrior ${warrior.priceGold}
          <img src="images/gold-coin.png" class="flex w-4 justify-center item-center"></img>
        </button>
        </div>
      </div>
    `;

    // Set inner content to the container
    warriorContainer.innerHTML = content;

    // Append the warrior container to the output container
    warriorsOutput.appendChild(warriorContainer);
  });
  // Add event listeners for warrior buy buttons
  addBuyButtonListeners(".buy-button");
};

// Function to display animals
const displayAnimals = (animals) => {
  const animalsOutput = document.querySelector(".animals-output");

  animals.forEach((animal, index) => {
    // Create container for each animal
    const animalContainer = document.createElement("div");
    animalContainer.className =
      "rounded-md border border-gray-300 overflow-hidden";

    // Create inner content
    const content = `
      <div class="flex flex-col justify-between px-4 py-2 min-h-full">
        <h3 class="text-lg text-center mb-2">${animal.categoryName}</h3>
        <img src="images/${animal.image}" alt="" class="w-24 mx-auto mb-2" />
        <div class="flex justify-center items-center"> 
        <button class="flex justify-center items-center gap-2 bg-green-500 text-white px-4 py-2 w-6/12 rounded-full buy-button"
          data-index="${index}" data-type="animal">
          Buy Animal ${animal.priceGold}
          <img src="images/gold-coin.png" class="flex w-4 justify-center item-center"></img>
        </button>
        </div>
      </div>
    `;

    // Set inner content to the container
    animalContainer.innerHTML = content;

    // Append the animal container to the output container
    animalsOutput.appendChild(animalContainer);
  });
  // Add event listeners for animal buy buttons
  addBuyButtonListeners(".buy-button");
};

// Function to display war machines
const displayWarMachines = (warMachines) => {
  const warMachinesOutput = document.querySelector(".war-machines-output");

  warMachines.forEach((warMachine, index) => {
    // Create container for each war machine
    const warMachineContainer = document.createElement("div");
    warMachineContainer.className =
      "rounded-md border border-gray-300 overflow-hidden";

    // Create inner content
    const content = `
      <div class="flex flex-col justify-between px-4 py-2 min-h-full">
        <h3 class="text-lg text-center mb-2">${warMachine.categoryName}</h3>
        <img src="images/${warMachine.image}" alt="" class="w-24 mx-auto mb-2" />
        <div class="flex justify-center items-center"> 
          <button class="flex justify-center items-center gap-2 bg-red-500 text-white px-4 py-2 w-6/12 rounded-full buy-button"
          data-index="${index}" data-type="warMachine">
          Buy War Machine ${warMachine.priceGold}
          <img src="images/gold-coin.png" class="flex w-4 justify-center item-center"></img>
          </button>
        </div>
      </div>
    `;

    // Set inner content to the container
    warMachineContainer.innerHTML = content;

    // Append the war machine container to the output container
    warMachinesOutput.appendChild(warMachineContainer);
  });
  // Add event listeners for war machine buy buttons
  addBuyButtonListeners(".buy-button");
};

// Function to add event listeners for buy buttons
const addBuyButtonListeners = (selector) => {
  const buyButtons = document.querySelectorAll(selector);

  // Remove existing event listeners
  buyButtons.forEach((button) => {
    button.removeEventListener("click", handleBuyButtonClick);
  });

  // Add new event listeners
  buyButtons.forEach((button) => {
    button.addEventListener("click", handleBuyButtonClick);
  });
};

// Event handler for buy button clicks
const handleBuyButtonClick = (event) => {
  const itemIndex = event.currentTarget.dataset.index;
  const itemType = event.currentTarget.dataset.type;

  // Identify the item based on its type
  let selectedItem;
  if (itemType === "warrior") {
    selectedItem = warriors[itemIndex];
  } else if (itemType === "animal") {
    selectedItem = animals[itemIndex];
  } else if (itemType === "warMachine") {
    selectedItem = warMachines[itemIndex];
  }

  // Call the buyItem function with the selected item
  buyItem(selectedItem);
};

const goldObject = document.querySelector("#gold-count");
const goldCount = parseInt(localStorage.getItem("gold-count")) || 0;

const metalObject = document.querySelector("#metal-count");
const metalCount = parseInt(localStorage.getItem("metal-count")) || 0;

const woodObject = document.querySelector("#wood-count");
const woodCount = parseInt(localStorage.getItem("wood-count")) || 0;

const display = () => {
  goldObject.innerHTML = goldCount;
  metalObject.innerHTML = metalCount;
  woodObject.innerHTML = woodCount;
};

window.addEventListener("load", display);

// Call the display functions
displayWarriors(warriors);
displayAnimals(animals);
displayWarMachines(warMachines);
