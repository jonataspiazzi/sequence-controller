import { AssetInfo } from "./types";
import { Elements } from "./htmlElements";
import AssetsLoader from "./assetsLoader";
import { SPLASH_PROGRESS_SEGMENT } from "./config";

export default class LoadingScreen {
  private loader: AssetsLoader;

  constructor(private html: Elements, private splashUrl: string, infos: AssetInfo[]) {
    this.loader = new AssetsLoader(infos);
  }

  async load() {
    await this.loadSplash();
    await this.loadData();
  }

  private async loadSplash() {
    return new Promise((resolve, reject) => {
      this.setProgress(SPLASH_PROGRESS_SEGMENT);
      this.setVisibility(true);

      this.html.splashImg.addEventListener('load', e => {
        resolve();
      });

      this.html.splashImg.addEventListener('error', e => {
        // TODO: Do something of fail
        reject();
      });

      this.html.splashImg.src = this.splashUrl;
    });
  }

  private async loadData() {
    return new Promise((resolve, reject) => {
      this.loader.addEventListener('progress', e => {
        this.setProgress(e.progress);
      });

      this.loader.addEventListener('load', e => {
        this.setVisibility(false);
        resolve();
      })

      this.loader.addEventListener('error', e => {
        // TODO: Do something of fail
        reject();
      });

      this.loader.load();
    });
  }

  private setProgress(progress: number) {
    const percentage = progress * 100;

    this.html.loadingPercentage.innerHTML = percentage.toFixed(2);
    this.html.loadingBar.style.width = `${Math.round(percentage)}%`;
  }

  private setVisibility(visible: boolean) {
    this.html.loading.style.display = visible ? 'flex' : 'none';
  }
}