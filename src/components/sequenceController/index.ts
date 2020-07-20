import { AssetInfo } from "./types";
import './index.scss';
import LoadingScreen from "./loadingScreen";
import { createElements } from "./htmlElements";

export default class SequenceController {
  constructor(private root: HTMLElement, private infos: AssetInfo[], private splashUrl: string) {
    const elements = createElements(root);
    const loading = new LoadingScreen(elements, splashUrl, infos);
    loading.load();
  }
}

export function createSequenceController(root: HTMLElement, infos: AssetInfo[], splashUrl: string) {
  return new SequenceController(root, infos, splashUrl);
}