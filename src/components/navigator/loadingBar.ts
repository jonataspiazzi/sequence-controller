export default class LoadingBar {
  private root: HTMLElement;
  private textBar: HTMLElement;
  private progressBar: HTMLElement;

  constructor(element: HTMLElement) {
    this.root = element;
    this.textBar = element.querySelector('.tool-bar .percentage');
    this.progressBar = element.querySelector('.progress .bar');
  }

  setProgress(progress: number) {
    const percentage = progress * 100;

    this.textBar.innerHTML = percentage.toFixed(2);
    this.progressBar.style.width = `${Math.round(percentage).toFixed(0)}%`;
  }

  setVisibility(visible: boolean) {
    this.root.style.display = visible ? 'flex' : 'none';
  }
}