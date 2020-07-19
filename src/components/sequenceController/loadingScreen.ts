import { SequenceInfo } from "./types";
import HtmlElements from "./htmlElements";
import SequenceLoader from "./sequenceLoader";

export default class LoadingScreen {
  private loader: SequenceLoader;

  constructor(private html: HtmlElements, private splashUrl: string, infos: SequenceInfo[]) {
    this.loader = new SequenceLoader(infos);
  }

  load() {
    this.html.get('splashImg').src = this.splashUrl;
    this.setProgress(.03);

    this.loader.addEventListener('progress', e => {
      this.setProgress(e.progress);
    });

    this.loader.addEventListener('load', e => {
      this.setVisibility(false);
    })

    this.loader.addEventListener('error', e => {
      // TODO: need to handle download error.
    });

    this.loader.load();
  }

  private setProgress(progress: number) {
    const percentage = progress * 100;

    this.html.get('loadingPercentage').innerHTML = percentage.toFixed(2);
    this.html.get('loadingBar').style.width = `${Math.round(percentage)}%`;
  }

  private setVisibility(visible: boolean) {
    this.html.get('loading').style.display = visible ? 'flex' : 'none';
  }
}