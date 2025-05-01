<template>
  <div class="w-full flex flex-col items-center">
    <!-- Image container -->
    <div class="relative w-full max-w-[600px]">
      <img
        :src="imageSrc"
        alt="Hotspot Image"
        class="w-full object-contain"
      />

      <!-- Hotspots -->
      <div
        v-for="(hotspot, index) in hotspots"
        :key="index"
        class="absolute group"
        :style="hotspotStyle(hotspot)"
      >
        <!-- Hotspot circle -->
        <div
          class="w-full h-full rounded-full bg-black opacity-60 flex items-center justify-center"
        >
          <div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
        </div>

        <!-- Tooltip: hover OR showAll -->
        <div
          class="absolute z-10 px-2 py-1 text-xs text-white bg-black bg-opacity-80 rounded whitespace-nowrap transition-opacity duration-150 pointer-events-none"
          :class="[
            showAll ? 'opacity-100' : 'group-hover:opacity-100 opacity-0'
          ]"
          :style="tooltipStyle(hotspot)"
        >
          {{ hotspot.label }}
        </div>
      </div>
    </div>

    <!-- Toggle under image, bottom right -->
    <div class="w-full max-w-[600px] flex justify-end mt-2 pr-2">
      <label class="flex items-center space-x-2 bg-white bg-opacity-80 px-3 py-1 rounded shadow text-sm text-gray-800">
        <span>Show All</span>
        <input
          type="checkbox"
          v-model="showAll"
          class="accent-black"
        />
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  hotspots: {
    type: Array,
    required: true,
    validator: (value) =>
      value.every((h) =>
        typeof h.x === 'number' &&
        typeof h.y === 'number' &&
        typeof h.width === 'number' &&
        typeof h.height === 'number' &&
        typeof h.label === 'string'
      ),
  },
})

const showAll = ref(false)

function hotspotStyle(hotspot) {
  return {
    top: `${hotspot.y}%`,
    left: `${hotspot.x}%`,
    width: `${hotspot.width}px`,
    height: `${hotspot.height}px`,
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
  }
}

function tooltipStyle(hotspot) {
  return {
    top: '-1.75rem',
    left: '50%',
    transform: 'translateX(-50%)',
  }
}
</script>

<style scoped>
/* Tailwind handles all styles */
</style>
