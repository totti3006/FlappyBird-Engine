class LoadImg {
  private static instance: LoadImg;

  private imageList: Array<{ name: string; img: HTMLImageElement }>;

  private constructor() {
    this.imageList = new Array<{ name: string; img: HTMLImageElement }>();
  }

  public static getInstance(): LoadImg {
    if (!LoadImg.instance) {
      LoadImg.instance = new LoadImg();
    }
    return LoadImg.instance;
  }

  public push(name: string, src: string) {
    let img = new Image();
    img.src = src;
    this.imageList.push({
      name: name,
      img: img,
    });
  }

  public getImg(name: string): HTMLImageElement | undefined {
    return this.imageList.find((img) => img.name == name)?.img;
  }

  public getAll(): Array<{ name: string; img: HTMLImageElement }> {
    return this.imageList;
  }
}

export default LoadImg;
