// getting-resources.js
const updateResourceCount = (resourceType, count) => {
  localStorage.setItem(`${resourceType}-count`, count);
  document.getElementById(`${resourceType}-count`).textContent = count;
};

const gatherResources = (resourceType) => {
  let count = parseInt(localStorage.getItem(`${resourceType}-count`)) || 0;

  if (resourceType === "metal" && Math.random() < 0.75) {
    count += 1;
  } else if (resourceType === "metal") {
    resourceType = "gold";
    count += 1;
  } else if (resourceType === "wood") {
    count += Math.floor(Math.random() * 5) + 1;
  }

  updateResourceCount(resourceType, count);
};

const changeCursor = (cursorImage) => {
  document.body.style.cursor = `url('${cursorImage}'), auto`;
};

const resetCursor = () => {
  document.body.style.cursor = "auto";
};

const setupResourceGatheringEvents = (
  imageSelector,
  cursorImage,
  resourceType
) => {
  const resourceImage = document.querySelector(imageSelector);

  resourceImage.addEventListener("mouseover", () => {
    changeCursor(cursorImage);
  });

  resourceImage.addEventListener("mouseout", resetCursor);

  resourceImage.addEventListener("click", () => {
    gatherResources(resourceType);
  });
};

const updateResourceCountsOnLoad = () => {
  ["metal", "wood", "gold"].forEach((resourceType) => {
    const count = parseInt(localStorage.getItem(`${resourceType}-count`)) || 0;
    updateResourceCount(resourceType, count);
  });
};

window.addEventListener("load", updateResourceCountsOnLoad);

// Set up events for mining image
setupResourceGatheringEvents(
  ".mining-image",
  "../images/pickaxe-cursor.png",
  "metal"
);

// Set up events for wood image
setupResourceGatheringEvents(".wood-image", "../images/axe-cursor.png", "wood");
