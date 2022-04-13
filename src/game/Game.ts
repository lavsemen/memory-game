import { ICard } from "@/types/Card";

export default class Game {

  private static createNumber(): [number, number] {
    const randInt = Math.round(Math.random() * 1000)
    return [randInt, randInt]
  }

  static createArray(countItems: number): Array<ICard> {
    
    let res: number[] = [];

    for (let i = 0; i < countItems / 2; i++) {
      const arrNumbers = this.createNumber();
      arrNumbers.forEach(num => res.push(num));
    }
    
    return res.sort(() => Math.random() - 0.5)
      .map((num, index) => ({
        id: index,
        value: num,
        isOpen: false,
        isChoose: false,
        isRight: false,
      }))

  }


  static checkValue(arr: Array<ICard>): boolean {
    if (arr.length !== 2) {
      return false
    }
    if ((arr[0].value === arr[1].value) && arr[0].id !== arr[1].id) {
      return true
    } else {
      return false
    }
  }
}