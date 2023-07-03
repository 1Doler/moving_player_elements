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

  private repeatStr(str: string, n: number): string {
    let newString = '';
    while (n-- > 0) newString += str;
    return newString 
  }

  private setGridTemplateArea(playerElement: HTMLElement | null, styleGridArea: string[], maxLength: number): void {
    if (playerElement && styleGridArea) {
      
      const styleGridAreaString = styleGridArea.reduce((acc: string,column: string) => {
        if(column.length) {
          acc += `"${column.toString().replace(',', '')}"`
        } else {
          acc += `"${this.repeatStr('. ', maxLength)}"`
        }
        return acc;
      }, "");

      playerElement.style.gridTemplateAreas = styleGridAreaString;
    }
  }

  private setGridArea(config: string[][]): void {
    config
    .reduce((acc, arr) => acc.concat(arr), [])
    .forEach((item: string) => {
      const elem = document.getElementById(item);
      if (!elem ) {
        item !== "." && console.log(`Элемент с id: ${item} не найден`)
        return
      } 
      elem.setAttribute("style", `grid-area: ${item}`);
    });
  }

  public moveElement(): void {
    if (!this.currentConfig) {
      console.log("Не указан конфиг");
      return;
    }

    const config = this.configs[this.currentConfig];
    
    const playerElement = document.getElementById("player");
    
    const styleGridArea: string[] = [];
    
    const lengthsConfig: number[] = [];
    
    config.forEach((item: string[]) => {
      
      const styleItemGrid = item.reduce((acc: string, value: string) => (acc += `${value} `),"");

      lengthsConfig.push(item.length)
      styleGridArea.push(styleItemGrid);

    });

    this.setGridTemplateArea(playerElement, styleGridArea, Math.max(...lengthsConfig));
    this.setGridArea( config );
  }
}

const newPlayer = new Player();

newPlayer.addConfig("first", [
  ["time", "progresBar", "progresBar"],
  ["play", "left", "right"],
]);

newPlayer.addConfig("second", [
  ["play", "left", "right"],
  ["time", "progresBar", "progresBar"],
]);


newPlayer.addConfig("new", [
  [],
  ["left", ".", ".", "right"],
  [ "play", "time", "progresBar", "progresBar"],
]);


newPlayer.switchConfig("first");

newPlayer.moveElement();