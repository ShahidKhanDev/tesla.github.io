const carModelElem = document.querySelector(".car__name .car__model");
const carDescElem = document.querySelector(".car__data .car__desc");
const carImage = document.querySelector(".slider .car img");

const modelArr = ["Model 3", "Model Y", "Model S", "Model X"];
const carImagesArr = ["model-3", "model-y", "model-s", "model-x"];
const carColors = ["#C01039", "#B3B7C9", "#fe2e54", "#acb9c4"];

let currentModel = 0;
let autoSlide = false;
let interval = false;
let currentImage = carImagesArr[currentModel];
let currentCarColor = carColors[currentModel];
let carImageParent = carImage.parentElement;

// loading the first car details with
carImageParent.style.setProperty("--clr", currentCarColor);
carModelElem.innerHTML = modelArr[currentModel];
carModelElem.classList.add("show");
carDescElem.classList.add("show");
carImage.src = `/src/images/${currentImage}.png`;
carImageParent.classList.add("animated");

// when the autoslide is on so the images will change automatically
if (autoSlide) {
  interval = setInterval(() => {
    carModelElem.classList.remove("show");
    carDescElem.classList.remove("show");
    carImageParent.classList.remove("animate-top");

    currentModel++;

    if (currentModel >= modelArr.length) {
      currentModel = 0;
    }

    setTimeout(() => {
      carModelElem.innerHTML = modelArr[currentModel];
      carModelElem.classList.add("show");
      carDescElem.classList.add("show");
      carImageParent.classList.add("animate-top");
    }, 1000);
  }, 3000);
}

// create model navs
const modelNavList = document.querySelector(".model__nav .nav__list");
modelArr.forEach((model, i) => {
  let navItem = `
    <li class="nav__item">${model}</li>
  `;

  modelNavList.innerHTML += navItem;
});

let allNavItems = modelNavList.querySelectorAll(".nav__item");

// adding the active class to the first nav item
allNavItems[currentModel].classList.add("active");

allNavItems.forEach((item, i) => {
  // setting up the custom css (--clr) property to each nav item from the carColorsArr
  // according to their index of i
  item.style.setProperty("--clr", carColors[i]);

  // creating the image attribute for each nav item from the carImagesArr
  // then we will use it to load the image accordingly
  item.setAttribute("data-image", carImagesArr[i]);

  item.addEventListener("click", () => {
    // if the nav item has active class then do nothing
    if (item.classList.contains("active")) return;

    // remove the active class from the element that currently has it
    modelNavList.querySelector(".active").classList.remove("active");

    // add the active class to the clicked element after a 100 millisecond delay
    setTimeout(() => {
      item.classList.add("active");
    }, 100);

    // Check if the current item does not have the "active" class
    if (!item.classList.contains("active")) {
      // Get the value of the "data-image" attribute from the current item
      let carImg = item.getAttribute("data-image");

      // Remove certain classes from elements to reset their states
      carModelElem.classList.remove("show");
      carDescElem.classList.remove("show");
      carImageParent.classList.remove("animate-top");
      carImageParent.classList.remove("animated");

      // Set the source of the car image element to a specific path based on the carImg value
      carImage.src = `src/images/${carImg}.png`;

      // Set the initial opacity and visibility of the car image
      carImage.style.opacity = "0";
      carImage.style.visibility = "hidden";

      // Set the value of currentCarColor to the corresponding value from the carColors array at index i
      currentCarColor = carColors[i];

      // Set a custom CSS variable "--clr" to the value of currentCarColor for the carImageParent element
      carImageParent.style.setProperty("--clr", currentCarColor);

      // Delay the execution of the following code by 500 milliseconds
      setTimeout(() => {
        // Set the inner HTML of carModelElem to the corresponding value from the modelArr array at index i
        carModelElem.innerHTML = modelArr[i];

        // Make the car image visible by setting opacity to 1 and visibility to visible
        carImage.style.opacity = "1";
        carImage.style.visibility = "visible";

        // Add certain classes to elements to apply animations and show them on the page
        carModelElem.classList.add("show");
        carDescElem.classList.add("show");
        carImageParent.classList.add("animate-top");
        carImageParent.classList.add("animated");
      }, 500);
    }
  });
});
