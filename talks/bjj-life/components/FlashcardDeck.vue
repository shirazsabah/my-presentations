<template>
  <div class="flashcarddeck">
    <div class="flashcard" @click="flipped = !flipped" v-if="cardCount > 0 && currentCard">
      <div class="card" :class="{ flipped }">
        <div class="front" :style="currentCardStyle">
          <div class="flip-indicator">
            FLIP <Icon icon="mdi:sync" class="animate-pulse" />
          </div>
          <h2>{{ currentCard.front }}</h2>
        </div>
        <div class="back" :style="currentCardStyle">
          <div class="flip-indicator">
            FLIP <Icon icon="mdi:sync" class="animate-pulse" />
          </div>
          <h2>{{ currentCard.back }}</h2>
        </div>
      </div>
    </div>
    <div v-else class="no-cards-message">
      <p>No cards in this deck.</p>
    </div>
    <div class="controls">
      <button @click="prevCard" :disabled="currentIndex === 0" title="Previous Card">
        &lsaquo; </button>
      <span class="progress">
        {{ currentIndex + 1 }} / {{ cardCount }}
      </span>
      <button @click="nextCard" :disabled="currentIndex === cardCount - 1" title="Next Card">
        &rsaquo; </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue';

// --- Pastel Background Colors ---
const pastelColors = [
  '#FFDFD3', '#D4F0F0', '#F8DFF0', '#D8E8D0', '#F5ECCD', '#DDECF2', '#FCE1E4', '#E2D8F0',
]

// --- Props (only accepts array of [front, back]) ---
const props = defineProps({
  cards: {
    type: Array,
    required: true,
    validator: (value) =>
      Array.isArray(value) &&
      value.every(item =>
        Array.isArray(item) &&
        item.length === 2 &&
        item.every(part => typeof part === 'string')
      )
  }
})

// --- Normalize input: [front, back] → { front, back } ---
const normalizedCards = computed(() =>
  props.cards.map(([front, back]) => ({ front, back }))
)

const currentIndex = ref(0)
const flipped = ref(false)

const cardCount = computed(() => normalizedCards.value.length)

const currentCard = computed(() =>
  normalizedCards.value[currentIndex.value] || null
)

const currentCardStyle = computed(() => {
  if (cardCount.value === 0) return {}
  const colorIndex = currentIndex.value % pastelColors.length
  return { backgroundColor: pastelColors[colorIndex] }
})

function nextCard() {
  if (currentIndex.value < cardCount.value - 1) {
    currentIndex.value++
    flipped.value = false
  }
}

function prevCard() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    flipped.value = false
  }
}

watch(() => props.cards, (newCards) => {
  const newLength = newCards.length
  if (currentIndex.value >= newLength) {
    currentIndex.value = Math.max(0, newLength - 1)
  }
  flipped.value = false
}, { deep: true })

// Initialize index on load
if (cardCount.value === 0 || currentIndex.value >= cardCount.value) {
  currentIndex.value = 0
}
</script>

<style scoped>
/* --- Base Layout (Adjusted) --- */
.flashcarddeck {
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally */
  /* Removed justify-content: center and min-height */
  padding: 2rem 1rem; /* Add padding around the whole component */
  box-sizing: border-box;
  font-family: sans-serif;
}

/* --- Flashcard Styling (Adjusted Margin) --- */
.flashcard {
  width: 400px;
  max-width: 90%;
  height: 280px;
  perspective: 1000px;
  cursor: pointer;
  margin-bottom: 1.5rem; /* Space below the card before controls */
}

/* --- No Cards Message (Adjusted Margin) --- */
.no-cards-message {
    color: #777;
    font-style: italic;
    width: 400px; /* Match card width */
    max-width: 90%;
    height: 280px; /* Match card height */
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #ccc; /* Optional: visual placeholder */
    border-radius: 12px;
    margin-bottom: 1.5rem; /* Space below the placeholder before controls */
}


.card {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card.flipped {
  transform: rotateY(180deg);
}

.front, .back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  padding: 1.5rem;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.4s ease;
  overflow-wrap: break-word;
  word-wrap: break-word;
  text-align: center;
}

.front h2, .back h2 {
    margin: 0;
}

.back {
  transform: rotateY(180deg);
}


/* --- Controls Styling (Adjusted Margin) --- */
.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 400px; /* Match card width */
  max-width: 90%;
}

.controls button {
  background-color: #f9f9f9; /* Lighter background */
  border: 1px solid #ddd; /* Slightly lighter border */
  color: #555;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem; /* Slightly smaller arrow */
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); /* Subtle shadow */
}


.controls button:hover {
  background-color: #eee;
  border-color: #ccc;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
}

.controls button:active {
  transform: scale(0.95);
  background-color: #e5e5e5;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.controls button:disabled {
  background-color: #f2f2f2;
  border-color: #eee;
  color: #aaa;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* --- Progress Indicator Styling --- */
.progress {
  font-size: 1rem;
  color: #777;
  font-weight: 500;
  min-width: 80px;
  text-align: center;
  flex-shrink: 0;
}

/* --- Flip Indicator Styling --- */
.flip-indicator {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 0.8rem;
  color: #aaa;
}

.flip-indicator i {
  margin-left: 0.2rem;
}

</style>