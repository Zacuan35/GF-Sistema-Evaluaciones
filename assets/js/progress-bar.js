class DacProgressBar {

  constructor(element) {
    this.element = element;

    this.init();
  }

  init() {

    const value = this.element.dataset.value || 0;
    const color = this.element.dataset.color || "#16a34a";
    const width = this.element.dataset.width || "100%";
    const height = this.element.dataset.height || "18px";
    const showLabel = this.element.dataset.label !== "false";

    this.element.style.setProperty(
      "--progress-color",
      color
    );

    this.element.style.setProperty(
      "--progress-width",
      width
    );

    this.element.style.setProperty(
      "--progress-height",
      height
    );

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

    const label = this.element.querySelector(
      ".dac-progress__label"
    );

    if (label) {
      label.textContent = `${safeValue}%`;
    }
  }

}

const progressBars = {};

document
  .querySelectorAll(".dac-progress")
  .forEach(element => {

    if (!element.id) return;

    progressBars[element.id] =
      new DacProgressBar(element);

  });


// Ejemplo dinámico
/*
setTimeout(() => {

  progressBars.progressUpload.setValue(80);

}, 2000);
*/