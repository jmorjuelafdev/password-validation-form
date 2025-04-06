const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const submitBtn = document.getElementById("submitBtn");
    const errorMessages = document.getElementById("errorMessages");
    const finalMessage = document.getElementById("finalMessage");
    const rulesBox = document.getElementById("rulesBox");

    const rules = {
      lengthRule: pw => pw.length >= 6,
      uppercaseRule: pw => /[A-Z]/.test(pw),
      lowercaseRule: pw => /[a-z]/.test(pw),
      numberRule: pw => /\d/.test(pw),
      especialRule: pw => /[#?!@$%^&*-]/.test(pw),
    };

    function validatePasswordRules(pw) {
      let valid = true;
      for (let rule in rules) {
        const icon = document.getElementById(rule);
        if (rules[rule](pw)) {
          icon.className = "icon success";
        } else {
          icon.className = "icon failure";
          valid = false;
        }
      }
      return valid;
    }

    function validateForm() {
      const errors = [];

      if (!nombre.value.trim()) errors.push("El nombre es requerido");
      if (!email.value.trim()) errors.push("El correo es requerido");
      if (!password.value.trim()) errors.push("La contraseña es requerida");
      if (!confirmPassword.value.trim()) errors.push("Debe confirmar la contraseña");

      const rulesValid = validatePasswordRules(password.value);
      if (
        password.value &&
        confirmPassword.value &&
        password.value !== confirmPassword.value
      ) {
        errors.push("Las contraseñas no coinciden");
      }

      renderErrors(errors);
      submitBtn.disabled = errors.length > 0 || !rulesValid;
    }

    function renderErrors(errors) {
      errorMessages.innerHTML = "";
      errors.forEach(error => {
        const li = document.createElement("li");
        li.textContent = error;
        errorMessages.appendChild(li);
      });
    }

    // Mostrar reglas al escribir
    password.addEventListener("focus", () => {
      rulesBox.style.display = "block";
    });

    password.addEventListener("input", () => {
      rulesBox.style.display = "block";
      validateForm();
    });

    [nombre, email, confirmPassword].forEach(field => {
      field.addEventListener("input", validateForm);
    });

    document.getElementById("myForm").addEventListener("submit", function (e) {
      e.preventDefault();
      finalMessage.style.display = "block";
    
      setTimeout(() => finalMessage.style.display = "none", 3000); // Esta línea oculta el mensaje
    
      this.reset();
      submitBtn.disabled = true;
      errorMessages.innerHTML = "";
      rulesBox.style.display = "none";
    
      const icons = document.querySelectorAll(".icon");
      icons.forEach(icon => icon.className = "icon failure");
    });
    