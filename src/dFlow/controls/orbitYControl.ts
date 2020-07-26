type Coord = { readonly offsetX: number, readonly offsetY: number };
type RotatorType = 'left' | 'right';

export function createRotator<T extends SVGElement>(element: T, type: RotatorType, time: number) {
  let originCood: Coord = null;
  let isActing: boolean;
  const { width, height } = element.getBoundingClientRect();

  element.addEventListener('mouseenter', (e: MouseEvent) => {
    isActing = false;
  });

  element.addEventListener('mouseleave', (e: MouseEvent) => {
    isActing = false;
  });

  element.addEventListener('mousemove', (e: MouseEvent) => {
    if (isActing) {
    }
  });

  element.addEventListener('mousedown', (e: MouseEvent) => {
    isActing = true;
    originCood = e;
  });

  element.addEventListener('mouseup', (e: MouseEvent) => {
    isActing = false;
  });

  function changeFrame() {

  }
}