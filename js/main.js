// SELECTING THE DOM
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");

const navItems = document.querySelectorAll(".nav-item");

let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");

    navItems.forEach((item) => item.classList.add("show"));

    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");

    navItems.forEach((item) => item.classList.remove("show"));

    showMenu = false;
  }
}

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  centeredSlides: false,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  },
});

// TO GET DATA FROM THE BACKEND
const container = document.getElementById("data");

async function testimonials() {
  try {
    const res = await fetch("https://portfoliodb-24w4.onrender.com/review");
    const data = await res.json();

    container.innerHTML = "";

    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("swiper-slide");
      card.innerHTML = `
  <div class="card">
    <div class="head">
      <h2 class="name">
        Name: <span class="name-output">${item.name}</span>
      </h2>
      <h3 class="role">
        Role: <span class="role-output">${item.role}</span>
      </h3>
    </div>
    <div class="data">
      <p class="data-output">
        ${item.comment}
      </p>
    </div>
  </div>
`;

      container.appendChild(card);
    });

    swiper.update();
  } catch (error) {
    console.error("Failed to fetch testimonials", error);
  }
}

testimonials();

// send a testimonials
const form = document.getElementById("testimonial-form");
const messageBox = document.querySelector(".mess");
const respond = document.getElementById("respond");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("https://portfoliodb-24w4.onrender.com/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    respond.textContent = result.message;
    messageBox.classList.add("show");

    setTimeout(() => {
      messageBox.classList.remove("show");
    }, 3000);

    form.reset();
  } catch (error) {
    respond.textContent = "Something went wrong. Please try again.";
    messageBox.classList.add("show");
  }
});
