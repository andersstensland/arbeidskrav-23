const goldObject = document.querySelector("#gold-count");
const woodObject = document.querySelector("#wood-count");
const metalObject = document.querySelector("#metal-count");
const searchValue = document.querySelector("#search-input");

const getCount = (item) => parseInt(localStorage.getItem(`${item}-count`)) || 0;

const goldCount = getCount("gold");
const metalCount = getCount("metal");
const woodCount = getCount("wood");

const updateYourArmyDisplay = () => {
  const rawData = localStorage.getItem("boughtItems");
  const data = rawData ? JSON.parse(rawData) : [];

  const warriors = filterByType(data, "Warrior");
  const other = filterByType(data, ["Animal", "War-machine"]);

  displayWarriors(warriors, ".your-army-warriors-output");
  displayOtherItems(other, ".your-army-other-output");
};

const filterByType = (data, types) => {
  return data.filter((item) => types.includes(item.type));
};

const displayItems = (items, outputContainer, imageSize = "w-16") => {
  items.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.className =
      "rounded-md border border-gray-300 overflow-hidden hover:shadow-md";

    const content = `
      <div class="flex flex-col items-center px-4 py-2">
        <h3 class="text-lg mb-2">${item.categoryName}</h3>
        <img src="images/${item.image}" alt="" class="${imageSize} mx-auto mb-2" />
      </div>
    `;

    itemContainer.innerHTML = content;
    outputContainer.appendChild(itemContainer);
  });
};

// Function to display warriors
const displayWarriors = (warriors, outputSelector) => {
  const warriorsOutput = document.querySelector(outputSelector);
  displayItems(warriors, warriorsOutput);
};

// Function to display other items
const displayOtherItems = (other, outputSelector) => {
  const otherOutput = document.querySelector(outputSelector);
  displayItems(other, otherOutput, "w-20");
};

// Function to handle search
const handleSearch = () => {
  const searchValue = document.querySelector("#search-input").value;
  const data = JSON.parse(localStorage.getItem("boughtItems")) || [];
  const filteredData = data.filter((item) =>
    item.categoryName.toLowerCase().includes(searchValue.toLowerCase())
  );

  displayFilteredItems(
    filteredData,
    ".your-army-warriors-output",
    ".your-army-other-output"
  );
};

// Function to display filtered items
const displayFilteredItems = (
  filteredData,
  warriorsOutputSelector,
  otherOutputSelector
) => {
  const warriorsOutput = document.querySelector(warriorsOutputSelector);
  const otherOutput = document.querySelector(otherOutputSelector);

  warriorsOutput.innerHTML = "";
  otherOutput.innerHTML = "";

  filteredData.forEach((data) => {
    const outputSelector =
      data.type === "Warrior" ? warriorsOutput : otherOutput;
    const imageSize =
      data.type === "Animal" || data.type === "War-machine" ? "w-20" : "w-16";

    displayItems([data], outputSelector, imageSize);
  });
};

// Function to display resource count
const display = () => {
  goldObject.innerHTML = goldCount;
  metalObject.innerHTML = metalCount;
  woodObject.innerHTML = woodCount;
};

// Function to update resource count
searchValue.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log("Enter key pressed");
    handleSearch();
  }
});

window.addEventListener("load", display);
window.addEventListener("load", updateYourArmyDisplay);
