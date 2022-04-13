<template>
  <div class="game__input" v-if="!gameIsOn">
    <label>{{label}}</label>
    <input
      :step="step"
      type="number"
      :max="max"
      class="game__input"
      @input="chnageInput"
      :value="modelValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  props: {
    modelValue: Number,
    max: String,
    gameIsOn: Boolean,
    label: String,
    step: String,
  },
  setup(props, { emit }) {

    const chnageInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target) {
        emit("update:modelValue", target.value);
        emit("chnage");
      }
    };

    return {
      chnageInput,
    };
  },
});
</script>
