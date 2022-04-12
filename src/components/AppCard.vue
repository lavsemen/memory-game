<template>
  <div class="card" @click="action">
    <div v-if="isShow" class="card__value">
       {{value}}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: Number,
    id: Number,
    isOpen: Boolean,
    isChoose: Boolean,
    isRight: Boolean
  },


  setup(props, { emit }) {
    const action = (): void => {
      emit('showCard', props.id)
    }


    const isShow = computed(() => {
      return props.isOpen || props.isChoose || props.isRight
    })

    return {
      action,
      isShow
    }
  }
})
</script>
