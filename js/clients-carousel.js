// Упрощенная карусель логотипов клиентов
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("clients-track");
  const prevBtn = document.getElementById("prev-client");
  const nextBtn = document.getElementById("next-client");

  if (!track) return;

  // Логотипы компаний
  const clients = [
    { name: "FROM SOFTWARE", logo: "images/photo3.jpg" },
    { name: "KOJIMA PRODUCTIONS", logo: "images/photo2.jpg" },
    { name: "HOYOVERSE", logo: "images/photo1.jpg" },
    { name: "PlatinumGames", logo: "images/photo4.png" },
    { name: "Bethesda Game Studios", logo: "images/photo5.png" },
    { name: "Gaijin Entertainment", logo: "images/logo.jpeg" },
  ];

  // Создаем логотипы
  clients.forEach((client) => {
    const logoElement = document.createElement("div");
    logoElement.className = "client-logo";

    logoElement.innerHTML = `
            <img src="${client.logo}" alt="${client.name}" loading="lazy">
            <div class="client-tooltip">${client.name}</div>
        `;

    track.appendChild(logoElement);
  });

  // Прокрутка карусели
  let scrollPosition = 0;
  const itemWidth = 200; // Ширина элемента с учетом отступов

  function updateCarousel() {
    track.style.transform = `translateX(-${scrollPosition}px)`;

    // Обновляем кнопки
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (prevBtn) {
      prevBtn.disabled = scrollPosition <= 0;
      prevBtn.style.opacity = prevBtn.disabled ? "0.3" : "1";
    }

    if (nextBtn) {
      nextBtn.disabled = scrollPosition >= maxScroll;
      nextBtn.style.opacity = nextBtn.disabled ? "0.3" : "1";
    }
  }

  // Кнопка "Назад"
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const itemsPerScroll = 3;
      scrollPosition = Math.max(0, scrollPosition - itemWidth * itemsPerScroll);
      updateCarousel();
    });
  }

  // Кнопка "Вперед"
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const itemsPerScroll = 3;
      const maxScroll = track.scrollWidth - track.clientWidth;
      scrollPosition = Math.min(
        maxScroll,
        scrollPosition + itemWidth * itemsPerScroll
      );
      updateCarousel();
    });
  }

  // Адаптация при изменении размера окна
  window.addEventListener("resize", () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (scrollPosition > maxScroll) {
      scrollPosition = maxScroll;
      updateCarousel();
    }
  });

  // Инициализация
  updateCarousel();
});
