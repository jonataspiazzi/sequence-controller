import { SequenceInfo } from "./types";
import './index.scss';
import LoadingScreen from "./loadingScreen";
import HtmlElements from "./htmlElements";

export default class SequenceController {
  constructor(private root: HTMLElement, private infos: SequenceInfo[], private splashUrl: string) {

    console.log('info', infos);



    const elements = new HtmlElements(root);
    const loading = new LoadingScreen(elements, splashUrl, infos);
    loading.load();
  }
}

export function createSequenceController(root: HTMLElement, infos: SequenceInfo[], splashUrl: string) {
  return new SequenceController(root, infos, splashUrl);
}