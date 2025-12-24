// Form submission handler for Drupal-Coder website

document.addEventListener("DOMContentLoaded", function () {
  const supportForm = document.getElementById("support-form");
  const formMessage = document.getElementById("form-message");

  if (supportForm) {
    supportForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(supportForm);
      const data = {
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        tariff: formData.get("tariff"),
        message: formData.get("message"),
        service: "Drupal Support",
        date: new Date().toISOString(),
      };

      // Basic validation
      if (!data.name || !data.email || !data.phone) {
        showFormMessage("Пожалуйста, заполните обязательные поля", "error");
        return;
      }

      if (!isValidEmail(data.email)) {
        showFormMessage("Пожалуйста, введите корректный email", "error");
        return;
      }

      // Show loading state
      const submitBtn = supportForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Отправка...";
      submitBtn.disabled = true;

      try {
        // Отправка на сервис для сохранения форм (Formspree, Formcarry и т.д.)
        // В реальном проекте нужно заменить на ваш сервис
        const response = await submitFormToService(data);

        if (response.ok) {
          // Success
          showFormMessage(
            "Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
            "success"
          );
          supportForm.reset();

          // Можно добавить отправку данных в Google Analytics или другие системы
          if (typeof gtag !== "undefined") {
            gtag("event", "form_submit", {
              event_category: "Support Form",
              event_label: "Drupal Support Request",
            });
          }
        } else {
          throw new Error("Ошибка отправки формы");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        showFormMessage(
          "Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.",
          "error"
        );
      } finally {
        // Restore button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show form message
  function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = "form-message " + type;
    formMessage.style.display = "block";

    // Auto-hide after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none";
    }, 5000);
  }

  // Submit form to service (замените на ваш сервис)
  async function submitFormToService(data) {
    const formspreeEndpoint = "https://formspree.io/f/xblnadae";
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Form data to submit:", data);

    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // В реальном проекте раскомментируйте один из вариантов выше и удалите этот return
    return {
      ok: true,
      json: async () => ({ success: true }),
    };
  }

  // Phone input formatting (optional)
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length > 0) {
        value = "+7 (" + value;

        if (value.length > 7) {
          value = value.slice(0, 7) + ") " + value.slice(7);
        }
        if (value.length > 12) {
          value = value.slice(0, 12) + "-" + value.slice(12);
        }
        if (value.length > 15) {
          value = value.slice(0, 15) + "-" + value.slice(15);
        }
        if (value.length > 18) {
          value = value.slice(0, 18);
        }
      }

      e.target.value = value;
    });
  }
});
