const courses = {
  "Primer semestre": [
    { name: "Introducción al cálculo", unlocks: ["Cálculo I", "Interpretación gráfica para la ingeniería", "Formación cultural", "Taller de integración de conocimientos", "Primera práctica profesional", "EFP I", "EFP II", "EFP III", "EFP IV", "Segunda práctica profesional", "Electivo seminario"] },
    { name: "Introducción al álgebra", unlocks: ["Álgebra I", "Formación cultural", "Taller de integración de conocimientos", "Primera práctica profesional", "EFP I", "EFP II", "EFP III", "EFP IV", "Segunda práctica profesional", "Electivo seminario"] },
    { name: "Introducción a la física", unlocks: ["Química inorgánica y orgánica", "Interpretación gráfica para la ingeniería", "Mecánica clásica", "Formación cultural", "Taller de integración de conocimientos", "Primera práctica profesional", "EFP I", "EFP II", "EFP III", "EFP IV", "Segunda práctica profesional", "Electivo seminario"] },
    { name: "Taller de comunicación y redacción de informes", unlocks: ["Taller de Ingeniería", "Formación cultural", "Taller de integración de conocimientos", "Primera práctica profesional", "EFP I", "EFP II", "EFP III", "EFP IV", "Segunda práctica profesional", "Electivo seminario"] },
    { name: "Introducción a la ingeniería", unlocks: ["Taller de Ingeniería", "Formación cultural", "Taller de integración de conocimientos", "Primera práctica profesional", "EFP I", "EFP II", "EFP III", "EFP IV", "Segunda práctica profesional", "Electivo seminario"] },
  ],
  // Continúa con los demás semestres...
};

// Generar cursos por semestre
function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  Object.entries(courses).forEach(([semester, subjectList]) => {
    const semesterDiv = document.createElement("div");
    semesterDiv.className = "semester";

    const title = document.createElement("h2");
    title.textContent = semester;
    semesterDiv.appendChild(title);

    subjectList.forEach(subject => {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
      courseDiv.textContent = subject.name;
      courseDiv.dataset.name = subject.name;

      courseDiv.addEventListener("click", () => toggleApproval(subject.name));

      semesterDiv.appendChild(courseDiv);
    });

    grid.appendChild(semesterDiv);
  });
}

// Almacenar materias aprobadas
let approvedCourses = new Set();

function toggleApproval(courseName) {
  if (approvedCourses.has(courseName)) {
    approvedCourses.delete(courseName);
  } else {
    approvedCourses.add(courseName);
  }

  updateGridClasses();
}

function updateGridClasses() {
  document.querySelectorAll(".course").forEach(div => {
    const name = div.dataset.name;
    if (approvedCourses.has(name)) {
      div.classList.add("approved");
    } else {
      div.classList.remove("approved");
    }
  });
}

renderGrid();

