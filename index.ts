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

  private setGridTemplateArea(playerElement: HTMLElement | null, styleGridArea: string[], maxLength: number, halfLength: number): void {
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
      playerElement.style.gridTemplateRows = `repeat(${halfLength}, auto) 1fr repeat(${maxLength-(maxLength-halfLength)-1}, auto)`;
    }
  }

  private setGridArea(config: string[][], halfLength: number): void {
    config.forEach((column: string[], index: number)=>{
      column.forEach((item: string)=>{
        const elem = document.getElementById(item);
        if (!elem ) {
          item !== "." && console.log(`Элемент с id: ${item} не найден`)
          return
        } 
        elem.style.gridArea = item;
        elem.style.gridRow = index < halfLength ? `${index+1}` : `${index+2}`;
      })
    })
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
    const halfLength = Math.round(config.length/2);

    this.setGridTemplateArea(playerElement, styleGridArea, Math.max(...lengthsConfig), halfLength);
    this.setGridArea( config, halfLength );
  }
}

const newPlayer = new Player();

newPlayer.addConfig("first", [
  ["time", "progresBar", "progresBar"],
  ["play", "left", "right"],
]);

newPlayer.addConfig("second", [
  ['play', 'title', 'title', "."],
  ['.', '.', '.', "."],
  [".", ".", "left", "right"],
  ["time", "progresBar", "progresBar", 'progresBar'],
]);


newPlayer.addConfig("new", [
  [ ".", "left", "right", "play"],
  [".", ".",".",".",],
  ["time", "progresBar", "progresBar", "progresBar"],
  ["title", "title", "title", "."],
]);

newPlayer.addConfig("new1", [
  ["time", "progresBar", "progresBar", "progresBar"],
  ["title",  "play", "left", "right"],
]);


newPlayer.switchConfig("second");

newPlayer.moveElement();