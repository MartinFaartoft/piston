namespace ps {
    export class ResourceManager {
        cache = {};
        readyCallbacks = [];

        preload(urls: string[]) {
            for (let url of urls) {
                if (!this.cache[url]) {
                    let img = new Image();
                    img.onload = () => {
                        this.cache[url] = img;

                        if (this.isReady()) {
                            for (let cb of this.readyCallbacks) {
                                cb();
                            }
                        }
                    };

                    this.cache[url] = false;
                    img.src = url;
                }
            }
        }

        get(url: string) {
            return this.cache[url];
        }

        onReady(callback) {
            this.readyCallbacks.push(callback);
        }

        private isReady(): boolean {
            for (let k in this.cache) {
                if (this.cache.hasOwnProperty(k) && !this.cache[k]) {
                    return false;
                }
            }

            return true;
        }
    }
}