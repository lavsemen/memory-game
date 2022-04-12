import { defineStore } from 'pinia'
import { ICard } from '@/types/Card'
import Game from '@/game/Game'

export const useStore = defineStore('main', {
  state: () => ({
    cards: [] as Array<ICard>,
    gameIsOn: false as boolean,
    choosedItems: [] as Array<ICard>,
    isFinish: false as boolean
  }),
  actions: {

    setCards(countCards: number = 36): void {
      const cards: Array<ICard> = Game.createArray(countCards)
      this.cards = cards;
    },

    setGameStatus(gameStatus: boolean): void {
      this.gameIsOn = gameStatus;
    },

    startNewGame(countCards: number) {
      console.log(countCards)
      this.gameIsOn = false;
      this.isFinish = false;
      this.setCards(countCards);
    },

    setAllOpening(isOpen: boolean): void {
      this.cards.forEach(card => card.isOpen = isOpen)
    },
    setChooseById(id: number): void {

      const hideChoosedItems = () => {
        this.cards.forEach(card => card.isChoose = false);
        this.choosedItems = [];
      }

      const setRight = () => {
        this.cards.forEach(card => {
          if (card.id === this.choosedItems[0].id || card.id === this.choosedItems[1].id) {
            card.isRight = true;
          }
        })
      }

      const setChoose = () => {
        const idx: number = this.cards.findIndex(card => card.id === id);
        if (!this.choosedItems.includes(this.cards[idx])) {
          this.cards[idx].isChoose = true
          this.choosedItems.push(this.cards[idx]);
        }

        if (Game.checkValue(this.choosedItems)) {
          setRight()
          hideChoosedItems()
        }
      }


      if (this.choosedItems.length < 2) {
        setChoose()

        if (this.cards.every(card => card.isRight)) {
          this.isFinish = true;
        }
      } else {
        hideChoosedItems()
        setChoose()
      }

    }
  },
})
