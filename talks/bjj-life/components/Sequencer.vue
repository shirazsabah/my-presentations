<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  words: Array
})

const correctOrder = computed(() =>
  props.words.map((word, index) => ({ id: index, text: word }))
)

const userOrder = ref([])
const resultStatus = ref(null) // null | 'correct' | 'incorrect'

onMounted(() => {
  userOrder.value = shuffle([...correctOrder.value])
})

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function checkOrder() {
  const isCorrect = userOrder.value.every((word, index) => word.id === index)
  resultStatus.value = isCorrect ? 'correct' : 'incorrect'

  // Reset resultStatus after 30 seconds
  setTimeout(() => {
    resultStatus.value = null
  }, 3000) // 3 seconds
}

let draggedItem = null

function dragStart(e, item) {
  draggedItem = item
}

function drop(e, item) {
  const from = userOrder.value.findIndex(w => w.id === draggedItem.id)
  const to = userOrder.value.findIndex(w => w.id === item.id)
  userOrder.value.splice(to, 0, userOrder.value.splice(from, 1)[0])
}
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="flex flex-col items-center gap-4">
      <div class="flex flex-wrap gap-2 justify-center">
        <div 
          v-for="word in userOrder" 
          :key="word.id"
          class="px-4 py-2 bg-blue-200 rounded cursor-move text-sm font-medium"
          draggable="true"
          @dragstart="dragStart($event, word)"
          @drop="drop($event, word)"
          @dragover.prevent
        >
          {{ word.text }}
        </div>
      </div>

      <div class="space-x-2">
        <button @click="checkOrder" class="btn">Check</button>
        <button @click="userOrder = shuffle([...userOrder])" class="btn">Shuffle</button>
      </div>

      <div v-if="resultStatus === 'correct'" class="text-green-600 flex items-center mt-2">
        <mdi-check-circle class="animate-pulse mr-2" />Correct!
      </div>
      <div v-else-if="resultStatus === 'incorrect'" class="text-red-600 flex items-center mt-2">
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
