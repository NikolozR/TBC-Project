let activeSlider = 0;

function renderCourses(data) {
  const courseGrid = document.querySelector(".courses-grid");
  data.forEach((el) => {
    const courseCard = `
        <div class="course">
        <img src=${el.img} alt=${el.name + " Image"}>
        <div class="course-body">
            <div class="course-info">
                <h3 class="course-name">${el.name}</h3>
                <p class="course-status">
                    ${
                      el.statusOfRegistration < 0
                        ? "რეგისტრაცია დასრულებულია"
                        : el.statusOfRegistration == 0
                        ? "მიმდინარეობს რეგისტრაცია"
                        : "რეგისტრაცია მალე დაიწყება"
                    }
                </p>
            </div>
            <a href="">
                <svg preserveAspectRatio="xMidYMid meet" fill="#00AEEF"
                    data-bbox="1.833 2.667 13.334 10.666" xmlns="http://www.w3.org/2000/svg"
                    viewBox="1.833 2.667 13.334 10.666" height="16" width="17" data-type="color"
                    role="presentation" aria-hidden="true">
                    <g>
                        <path fill="#00AEEF"
                            d="m10.3 2.867 4.667 4.666a.645.645 0 0 1 0 .934L10.3 13.133a.644.644 0 0 1-.933 0 .644.644 0 0 1 0-.933L12.9 8.667H2.5c-.4 0-.667-.267-.667-.667s.267-.667.667-.667h10.4L9.367 3.8a.605.605 0 0 1-.2-.467c0-.2.066-.333.2-.466a.644.644 0 0 1 .933 0Z"
                            data-color="1"></path>
                    </g>
                </svg>
                კურსის დეტალები
            </a>
        </div>
    </div>
        `;

    courseGrid.insertAdjacentHTML("beforeend", courseCard);
  });
}

function renderPartners(data) {
  const carouselContent = document.querySelector(".carousel-content");
  let wrapped = [];
  let wrapper = document.createElement("div");
  wrapper.setAttribute("class", "carousel-slider");
  data.forEach((el, i) => {
    const carouselInside = `<img src=${el.img} alt=${
      "Image for " + el.name
    } style="width: ${el.width}px;">`;
    wrapper.insertAdjacentHTML("beforeend", carouselInside);
    if (i % 3 === 2) {
      wrapped.push(wrapper);
      wrapper = document.createElement("div");
      wrapper.setAttribute("class", "carousel-slider");
    }
    if (i === data.length - 1 && i % 3 != 2) {
      if (i % 3 === 1) {
        wrapper.style.justifyContent = "space-evenly";
      } else {
        wrapper.style.justifyContent = "center";
      }
      wrapped.push(wrapper);
    }
  });
  wrapped.forEach((el, i) => {
    if (i !== activeSlider) {
      el.style.opacity = 0;
    }
    carouselContent.append(el);
  });
}

function updateSliders() {
  const p = document.querySelector(".carousel-content").children;
  for (let i = 0; i < p.length; i++) {
    if (i === activeSlider) {
      p[i].style.opacity = 1;
    } else {
      p[i].style.opacity = 0;
    }
  }
}

function changeSlider(n) {
  const p = document.querySelector(".carousel-content").children;
  if (activeSlider + n < 0) activeSlider = p.length - 1;
  else if (activeSlider + n >= p.length) activeSlider = 0;
  else activeSlider += n;
  updateSliders();
}

function specificSlider(n) {
  activeSlider = n;
  updateSliders();
}

function fetchLocalJson() {
  fetch("./data/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderCourses(data.courses);
      renderPartners(data.partners);
    })
    .catch((error) => {
      console.error("Error fetching the JSON file:", error);
    });
}

fetchLocalJson();

document
  .querySelector(".slide-left button")
  .addEventListener("click", () => changeSlider(-1));

document
  .querySelector(".slide-right button")
  .addEventListener("click", () => changeSlider(1));

document.querySelectorAll(".sliders a").forEach((el) => {
  el.addEventListener("click", (e) => {
    console.log();
    // console.log(e.target.value);
    specificSlider(parseInt(e.target.getAttribute("id") ));
  });
});


document.querySelectorAll(".item-visible").forEach((el) => {
  el.addEventListener("click", (e) => {
    const sibling = document.querySelectorAll(".accordion-content")[parseInt(e.target.getAttribute("aria-label"))]
    let isHidden = sibling.getAttribute("aria-hidden")
    if (isHidden == "true") {
      sibling.style.opacity = 1
      sibling.style.maxHeight = "100%"
      sibling.setAttribute("aria-hidden", "false")
    } else {
      sibling.style.opacity = 0
      sibling.style.maxHeight = 0
      sibling.setAttribute("aria-hidden", "true")
    }

  })
})


document.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav")
  if (window.scrollY !== 0) {
    navbar.style.backgroundColor = "rgba(26, 30, 31, 0.8)"
  } else {
    navbar.style.backgroundColor = "rgba(26, 30, 31, 1)"  
  }
})