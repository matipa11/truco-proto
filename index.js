
const META = 30;
const PALITOS = [
  [6, 6, 38, 6],    // arriba
  [38, 6, 38, 38],  // derecha
  [38, 38, 6, 38],  // abajo
  [6, 38, 6, 6],    // izquierda
  [6, 38, 38, 6]    // diagonal
];


function crearGrupo() {
  const lineas = PALITOS.map(p => `
    <g class="palito">
      <line x1="${p[0]}" y1="${p[1]}" x2="${p[2]}" y2="${p[3]}" stroke="#efe2c0" stroke-width="4" stroke-linecap="round"/>
      <circle cx="${p[0]}" cy="${p[1]}" r="3.6" fill="#c0392b"/>
    </g>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">${lineas}</svg>`;
}


function pintar(contenedor, pts) {
  contenedor.querySelectorAll("svg").forEach((svg, i) => {
    const activos = Math.max(0, Math.min(5, pts - i * 5));
    svg.querySelectorAll(".palito").forEach((palito, j) => {
      palito.classList.toggle("on", j < activos);
    });
  });
}


document.querySelectorAll(".team").forEach(equipo => {
  let puntos = 0;

  const malas = equipo.querySelector(".malas");
  const buenas = equipo.querySelector(".buenas");
  const btnSumar = equipo.querySelector(".sumar");
  const btnRestar = equipo.querySelector(".restar");
  malas.innerHTML = crearGrupo().repeat(3);
  buenas.innerHTML = crearGrupo().repeat(3);

  function actualizar() {
    pintar(malas, Math.min(puntos, 15));
    pintar(buenas, Math.max(0, puntos - 15));
  }

  btnSumar.addEventListener("click", () => {
    if (puntos < META) {
      puntos++;
      actualizar();
    }
  });

  btnRestar.addEventListener("click", () => {
    if (puntos > 0) {
      puntos--;
      actualizar();
    }
  });

  actualizar(); 
});