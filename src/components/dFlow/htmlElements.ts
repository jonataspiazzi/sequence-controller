export interface Elements {
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

export function createElements(element: HTMLElement): Elements {
  const original = {} as Elements;
  const dynamic = {} as Elements;

  for (let prop in queries) {
    const name = prop as keyof Elements;

    Object.defineProperty(dynamic, name, {
      enumerable: true,
      get: () => {
        return original[name] || (original[name] = element.querySelector(queries[name]))
      }
    });
  }

  return dynamic;
}