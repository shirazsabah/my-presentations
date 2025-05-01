<template>
    <div class="flashcarddeck">
      <div v-if="selectedCards.length" class="card-grid">
        <div
          class="flashcard"
          v-for="(card, index) in selectedCards"
          :key="index"
          @click="toggleFlip(index)"
        >
          <div class="card" :class="{ flipped: flipped[index] }" :style="getCardStyle(index)">
            <div class="front">
              <div class="flip-indicator">
                FLIP <mdi-sync class="animate-pulse" />
              </div>
              <h2 class="card-text">{{ card.front }}</h2>
            </div>
            <div class="back">
              <div class="flip-indicator">
                FLIP <mdi-sync class="animate-pulse" />
              </div>
              <h2 class="card-text">{{ card.back }}</h2>
            </div>
          </div>
        </div>
      </div>
  
      <div v-else class="no-cards-message">
        <p>No cards in this deck.</p>
      </div>
  
      <div class="controls shuffle-control">
        <button @click="shuffle" title="Shuffle Cards">
        <mdi-shuffle-variant height="24"/>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  const pastelColors = [
    '#FFDFD3', '#D4F0F0', '#F8DFF0', '#D8E8D0',
    '#F5ECCD', '#DDECF2', '#FCE1E4', '#E2D8F0', '#F2F0D8'
  ]
  
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
  
  const normalizedCards = computed(() =>
    props.cards.map(([front, back]) => ({ front, back }))
  )
  
  const selectedCards = ref([])
  const flipped = ref([])
  
  function shuffle() {
    const shuffled = [...normalizedCards.value].sort(() => 0.5 - Math.random()).slice(0, 6)
    selectedCards.value = shuffled
    flipped.value = Array(6).fill(false)
  }
  
  function toggleFlip(index) {
    flipped.value[index] = !flipped.value[index]
  }
  
  function getCardStyle(index) {
    const colorIndex = index % pastelColors.length
    return { backgroundColor: pastelColors[colorIndex] }
  }
  
  watch(() => props.cards, shuffle, { immediate: true })
  </script>
  
  <style scoped>
  .flashcarddeck {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    font-family: sans-serif;
  }
  
  /* --- Force 2 rows x 3 columns layout --- */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
    width: 100%;
    max-width: 750px;
  }
  
  .flashcard {
    aspect-ratio: 3 / 2;
    perspective: 1000px;
    cursor: pointer;
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
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    box-sizing: border-box;
    text-align: center;
    backface-visibility: hidden;
    overflow: hidden;
  }
  
  .card-text {
    font-size: clamp(0.7rem, 1.1vw, 1rem);
    line-height: 1.3;
    margin: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    max-height: 100%;
    overflow-y: auto;
    padding: 0.3rem;
    color: rgba(0, 0, 0, 0.6);
  }
  
  .back {
    transform: rotateY(180deg);
  }
  
  .flip-indicator {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 0.7rem;
    color: #aaa;
  }
  
  .no-cards-message {
    color: #777;
    font-style: italic;
    width: 100%;
    max-width: 400px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #ccc;
    border-radius: 12px;
    margin: 1rem 0;
  }
  
  .controls.shuffle-control {
    margin-top: 1rem;
  }
  
  .shuffle-control button {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    color: #555;
    padding: 0.5rem 0.8rem;
    font-size: 1rem;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
  }
  
  .shuffle-control button:hover {
    background-color: #eee;
    border-color: #ccc;
    box-shadow: 0 2px 5px rgba(0,0,0,0.08);
  }
  
  .shuffle-control button:active {
    transform: scale(0.95);
    background-color: #e5e5e5;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }
  </style>
  