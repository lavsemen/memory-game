<template>
  <main class="game">
    <div class="game__overlay" v-if="!store.isFinish">
      <div class="game__input">
        <label>Количество элементов</label>
        <input
          step="2"
          type="number"
          max="36"
          @change="setCountCards"
          class="game__input"
          v-model="countCards"
        />
      </div>

      <div class="game__wrapper">
        <app-card
          v-for="card in store.cards"
          :key="card.id"
          :id="card.id"
          :value="card.value"
          :isOpen="card.isOpen"
          :isChoose="card.isChoose"
          :isRight="card.isRight"
          @showCard="chooseCard"
        />
      </div>
      <h2 v-if="timeBeforeStartGame">{{ timeBeforeStartGame }}</h2>
      <button
        @click="clickBtn"
        class="game__button"
        :class="{ finish: store.gameIsOn }"
      >
        {{ !store.gameIsOn ? "Начать игру" : "Закончить игру" }}
      </button>
    </div>
    <div v-else>
      <h1>Победа</h1>
      <button @click="startNewGame" class="game__button">Начать игру</button>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "@vue/runtime-core";
import AppCard from "./components/AppCard.vue";
import { useStore } from "./stores/main-store";

export default defineComponent({
  components: { AppCard },
  name: "App",
  setup() {
    const store = useStore();
    const timeBeforeStartGame = ref(5);
    const countCards = ref(36);
    let timeOfStart: number;

    const startNewGame = () => {
      timeBeforeStartGame.value = 5;
      store.startNewGame(countCards.value);
    };
    const finishGame = () => {
      clearInterval(timeOfStart);
      timeBeforeStartGame.value = 5;
      store.setAllOpening(false);
      store.setGameStatus(false);
      store.setCards(countCards.value);
    };
    const startGame = () => {
      store.setAllOpening(true);
      store.setGameStatus(true);
      timeOfStart = setInterval(() => {
        timeBeforeStartGame.value--;
      }, 1000);
    };

    const chooseCard = (id: number): void => {
      if (store.gameIsOn) {
        store.setChooseById(id);
      }
    };

    const clickBtn = () => {
      if (!store.gameIsOn) {
        startGame();
      } else {
        finishGame();
      }
    };

    const setCountCards = () => {
      store.setCards(countCards.value);
    };

    watch(countCards, (newValue: number) => {
      if (newValue > 36) {
        countCards.value = 36;
      }
    });

    watch(timeBeforeStartGame, (newValue: number) => {
      if (newValue <= 0) {
        clearInterval(timeOfStart);
        store.setAllOpening(false);
      }
    });
    onMounted(() => {
      store.setCards(countCards.value);
    });

    return {
      store,
      finishGame,
      timeBeforeStartGame,
      startGame,
      startNewGame,
      countCards,
      chooseCard,
      clickBtn,
      setCountCards,
    };
  },
});
</script>
