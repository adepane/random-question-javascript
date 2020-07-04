class ProgressBar extends HTMLElement {

  set total(total) {
    this._total = total;
    this.render();
  }

  render() {
    let valueNow = 0;
    if (this._total.current != 0) {
      valueNow = (this._total.current / this._total.total) * 100;
    }
    this.innerHTML = `
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: ${valueNow}%" aria-valuenow="2" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    `;
  }
}

customElements.define("progress-bar", ProgressBar);