document.addEventListener("DOMContentLoaded", function () {
  const courses = document.querySelectorAll(".course");

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
          course.classList.remove("approved"); // Quita aprobación si se bloquea
        }
      }
    });
  }

  courses.forEach((course) => {
    course.addEventListener("click", () => {
      if (course.classList.contains("disabled")) return;

      course.classList.toggle("approved");
      updateUnlocks();
    });
  });

  updateUnlocks();
});
