<!document.addEventListener("DOMContentLoaded", function () {
  const courses = document.querySelectorAll(".course");

  // Función para revisar y actualizar el estado de todos los cursos
  function updateUnlocks() {
    courses.forEach((course) => {
      const prereqs = course.dataset.prereqs;
      if (prereqs) {
        const requiredCodes = prereqs.split(",");
        const allApproved = requiredCodes.every((code) =>
          document.querySelector(`.course[data-code="${code}"]`)?.classList.contains("approved")
        );
        if (allApproved) {
          course.classList.remove("disabled");
        } else {
          course.classList.add("disabled");
          course.classList.remove("approved"); // Quitar aprobación si se bloquea
        }
      }
    });
  }

  // Evento al hacer clic en cada curso
  courses.forEach((course) => {
    course.addEventListener("click", () => {
      if (course.classList.contains("disabled")) return;

      // Alternar clase "approved"
      course.classList.toggle("approved");

      // Actualizar el estado de desbloqueo
      updateUnlocks();
    });
  });

  // Al cargar, revisar todos los desbloqueos
  updateUnlocks();
});

});

// Inicializar
habilitarIniciales();
