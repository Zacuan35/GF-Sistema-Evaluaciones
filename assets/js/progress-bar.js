class DacProgressBar {

  constructor(element) {
    this.element = element;

    this.init();
  }

  init() {

    const value = this.element.dataset.value || 0;

    const showLabel =
      this.element.dataset.label !== "false";

    this.element.innerHTML = `
      <div class="dac-progress__bar"></div>

      ${
        showLabel
          ? `<span class="dac-progress__label">${value}%</span>`
          : ""
      }
    `;

    this.setValue(value);
  }

  setValue(value) {

    const safeValue = Math.max(
      0,
      Math.min(100, parseInt(value))
    );

    this.element.dataset.value = safeValue;

    this.element.style.setProperty(
      "--progress-value",
      `${safeValue}%`
    );

    this.element.setAttribute(
      "aria-valuenow",
      safeValue
    );

    const label =
      this.element.querySelector(
        ".dac-progress__label"
      );

    if (label) {
      label.textContent = `${safeValue}%`;
    }
  }

}


/* =========================
   Inicialización automática
========================= */

const progressBars = {};

document
  .querySelectorAll(".dac-progress")
  .forEach(element => {

    if (!element.id) return;

    progressBars[element.id] =
      new DacProgressBar(element);

  });


/* =========================
   Ejemplo dinámico
========================= */

/*

HTML:

<div
  id="progressUpload"
  class="dac-progress bg-success"
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="25"
  data-value="25"
  data-label="true"
></div>


JavaScript:

progressBars.progressUpload.setValue(80);


También puedes usarlo dinámicamente:

setTimeout(() => {

  progressBars.progressUpload.setValue(100);

}, 2000);

*/