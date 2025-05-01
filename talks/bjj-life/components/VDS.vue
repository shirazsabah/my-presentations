<script setup>
import { reactive, watch } from 'vue'
import Draggable from 'vuedraggable'

const props = defineProps({
  words: {
    type: Array,
    required: true
  }
})

const state = reactive({
  userOrder: [],
  resultStatus: null
})

watch(
  () => props.words,
  (words) => {
    if (words && words.length > 0) {
      state.userOrder = shuffle(
        words.map((word, index) => ({ id: index, text: word }))
      )
    }
  },
  { immediate: true }
)

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function checkOrder() {
  const isCorrect = state.userOrder.every((word, index) => word.id === index)
  state.resultStatus = isCorrect ? 'correct' : 'incorrect'
  setTimeout(() => (state.resultStatus = null), 3000)
}
</script>




<template>
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="flex flex-col items-center gap-4">
      <draggable
  v-model="state.userOrder"
  item-key="id"
  class="flex flex-col gap-2 items-start"
>
  <template #item="{ element }">
    <div class="px-4 py-2 bg-blue-200 rounded cursor-move text-sm font-medium">
      {{ element.text }}
    </div>
  </template>
</draggable>

      <div class="space-x-2">
        <button @click="checkOrder" class="btn">Check</button>
        <button @click="state.userOrder = shuffle([...state.userOrder])" class="btn">Shuffle</button>
      </div>

      <div v-if="state.resultStatus === 'correct'" class="text-green-600 flex items-center mt-2">
        <mdi-check-circle class="animate-pulse mr-2" />Correct!
      </div>
      <div v-else-if="state.resultStatus === 'incorrect'" class="text-red-600 flex items-center mt-2">
        <mdi-close-circle class="animate-pulse mr-2" />Incorrect. Please try again!
      </div>
    </div>
  </div>
</template>


<style scoped>
.btn {
  padding: 6px 14px;
  background: #2563eb;
  color: white;
  border-radius: 6px;
  font-weight: 500;
}
</style>
