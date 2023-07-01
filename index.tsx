class Player {
  private configs: { [key: string]: string[][] };
  private currentConfig: string | null;

  constructor() {
    this.configs = {};
    this.currentConfig = null;
  }

  public addConfig(configName: string, element: string[][]): void {
    this.configs[configName] = element;
  }

  public switchConfig(configName: string): void {
    this.currentConfig = configName;
  }

  public moveElement(): void {
    if (!this.currentConfig) {
      console.log("Не указан конфиг");
      return;
    }
    const config = this.configs[this.currentConfig];
    const playerElement = document.getElementById("player");

    const styleGridArea: string[] = [];

    config.forEach((item: string[]) => {
      const styleItemGrid = item.reduce(
        (acc: string, value: string) => (acc += `${value} `),
        ""
      );
      styleGridArea.push(styleItemGrid);
    });
    console.log(styleGridArea);
    if (playerElement) {
      playerElement.style.gridTemplateAreas = `"${styleGridArea[0]} ."
                                       "${styleGridArea[1]} ."`;
    }

    config
      .reduce((acc, arr) => acc.concat(arr), [])
      .forEach((item: string) => {
        const elem = document.getElementById(item);
        if (elem) {
          elem.setAttribute("style", `grid-area: ${item}`);
        }
      });
  }
}

const newPlayer = new Player();

newPlayer.addConfig("first", [
  ["time", "progresBar", "progresBar"],
  ["play", "left", "right"],
]);
newPlayer.switchConfig("first");

newPlayer.moveElement();

console.log(newPlayer);
