interface Elements {
  splash: HTMLElement;
  splashImg: HTMLImageElement;
  loading: HTMLElement;
  loadingPercentage: HTMLElement;
  loadingBar: HTMLElement;
}

const queries: { [K in Extract<keyof Elements, string>]: string } = {
  splash: '.splash',
  splashImg: '.splash img',
  loading: '.loading',
  loadingPercentage: '.loading .status .percentage',
  loadingBar: '.loading .progress .bar'
}

export default class HtmlElements {
  private elements = {} as Elements;

  constructor(private element: HTMLElement) {
  }

  get<K extends keyof Elements>(elementName: K): Elements[K] {
    return this.elements[elementName] ||
      (this.elements[elementName] = this.element.querySelector(queries[elementName]));
  }
}