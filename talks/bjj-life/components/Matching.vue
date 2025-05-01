<template>
  <div class="p-4 text-xs leading-snug flex flex-col max-h-screen overflow-hidden">
    <!-- Main Content Area -->
    <div class="flex-grow overflow-y-auto">
      <div class="flex flex-col space-y-1 max-w-full mx-auto">
        <div
          v-for="right in rightItems"
          :key="right.id"
          class="flex items-center w-full"
        >
          <!-- Drop Zone (1/3) -->
          <div class="w-1/3 pr-2">
            <draggable
              v-model="matchedItems[right.id]"
              group="match"
              :item-key="'id'"
              class="h-14 border-2 border-dashed border-gray-400 rounded flex items-center justify-center bg-gray-50 overflow-hidden"
              @change="(evt) => onDrop(evt, right.id)"
            >
              <template #item="{ element }">
                <div
                  class="p-1 w-full text-center bg-blue-200 rounded cursor-grab text-xs whitespace-normal break-words"
                  :title="element.label"
                >
                  {{ element.label }}
                </div>
              </template>
              <template #empty>
                <div class="text-gray-400 text-xs text-center">Drop Here</div>
              </template>
            </draggable>
          </div>

          <!-- Right Item Label (1/3, centered) -->
          <div class="w-1/3 px-2 text-sm font-small whitespace-normal break-words text-center">
            {{ right.label }}
          </div>

          <!-- Correct/Incorrect Status (1/3) -->
          <div class="w-1/3 pl-2 text-sm text-left flex items-center">
            <span v-if="matchStatuses[right.id]" class="flex items-center">
              <mdi-check-circle
                v-if="matchStatuses[right.id] === 'Correct'"
                class="animate-pulse mr-2 text-green-600"
              />
              <mdi-close-circle
                v-else
                class="animate-pulse mr-2 text-red-600"
              />
              <span
                :class="{
                  'text-green-600': matchStatuses[right.id] === 'Correct',
                  'text-red-600': matchStatuses[right.id] === 'Incorrect'
                }"
              >
                {{ matchStatuses[right.id] }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>    

    <!-- Left Pool (Drag from here) -->
    <div class="mt-6">
      <h3 class="text-sm font-semibold mb-2">Drag from here</h3>
      <draggable
        v-model="leftPool"
        group="match"
        item-key="id"
        class="flex gap-4 overflow-x-auto"
        @change="onLeftChange"
      >
        <template #item="{ element }">
          <div
            class="p-1 w-64 text-center bg-blue-100 border rounded cursor-grab text-xs whitespace-normal break-words"
            :title="element.label"
          >
            {{ element.label }}
          </div>
        </template>
      </draggable>
    </div>

    <!-- Controls -->
    <div class="mt-6 text-center">
      <button class="btn" @click="checkMatches">Check Matches</button>
      <button class="btn ml-2" @click="resetGame">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import draggable from 'vuedraggable';

const props = defineProps({
  items: { type: Array, required: true }, // [{ label: 'strength', description: 'The amount of force to break' }, ...]
});

// Split the items into two parts: one for left (labels) and one for right (descriptions)
const leftItems = computed(() =>
  props.items.map((item, index) => ({ id: String(index), label: item[0] }))
);

const rightItems = computed(() =>
  props.items.map((item, index) => ({ id: String(index), label: item[1] }))
);

const leftPool = ref([]);
const matchedItems = ref({});
const matchStatuses = ref({});
const message = ref("");

const shuffleArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const initGame = () => {
  matchedItems.value = {};
  matchStatuses.value = {};
  rightItems.value.forEach((item) => {
    matchedItems.value[item.id] = [];
  });
  leftPool.value = shuffleArray(leftItems.value);
  message.value = "";
};

const resetGame = () => initGame();

const onDrop = (evt, rightId) => {
  const newItem = matchedItems.value[rightId][0];
  for (const key in matchedItems.value) {
    if (key !== rightId) {
      matchedItems.value[key] = matchedItems.value[key].filter(
        (item) => item.id !== newItem.id
      );
    }
  }

  if (evt.removed == null && evt.added) {
    if (matchedItems.value[rightId].length > 1) {
      const displaced = matchedItems.value[rightId].shift();
      leftPool.value.push(displaced);
    }
  }

  matchedItems.value[rightId] = matchedItems.value[rightId].slice(0, 1);
};

const onLeftChange = (evt) => {
  if (evt.added) {
    const movedId = evt.added.element.id;
    for (const key in matchedItems.value) {
      matchedItems.value[key] = matchedItems.value[key].filter(
        (item) => item.id !== movedId
      );
    }
  }
};

const checkMatches = () => {
  let correct = 0;
  for (const right of rightItems.value) {
    const match = matchedItems.value[right.id][0];
    if (match && match.id === right.id) {
      correct++;
      matchStatuses.value[right.id] = "Correct";
    } else {
      matchStatuses.value[right.id] = "Incorrect";
    }
  }
  if (correct === rightItems.value.length) {
    message.value = "Correct! All matches are correct!";
  } else {
    message.value = `${correct} / ${rightItems.value.length} correct`;
  }
};

onMounted(initGame);
watch(() => props.items, initGame);
</script>

<style scoped>
.btn {
  @apply px-5 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-300;
}

.max-h-screen {
  max-height: 80vh;
  overflow-y: auto;
}

.text-xs {
  font-size: 0.75rem;
}

.w-64 {
  width: 16rem;
}

.p-1 {
  padding: 0.25rem;
}

.h-14 {
  height: 2rem;
}

.flex-wrap {
  flex-wrap: nowrap;
}
</style>
