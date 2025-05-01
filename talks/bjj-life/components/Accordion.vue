<template>
  <div class="accordion">
    <div
      v-for="(item, index) in normalizedItems"
      :key="index"
      class="accordion-item"
    >
      <button
        class="accordion-header"
        @click="toggle(index)"
      >
        {{ item.title }}
        <span class="icon">
          {{ openIndex === index ? '▲' : '▼' }}
        </span>
      </button>
      <Transition name="accordion">
        <div
          v-show="openIndex === index"
          class="accordion-body"
          v-html="item.content"
        />
      </Transition>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
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

// Normalize [title, content] into { title, content }
const normalizedItems = computed(() =>
  props.items.map(([title, content]) => ({ title, content }))
)

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>


<style scoped>
.accordion {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.accordion-item {
  border-bottom: 1px solid #e5e7eb;
}
.accordion-header {
  width: 100%;
  text-align: left;
  padding: 1rem;
  background: #f3f4f6;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.accordion-body {
  padding: 1rem;
  background: #ffffff;
  overflow: hidden;
}

/* Animation */
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease, padding 0.3s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px; /* Adjust depending on content size */
}
</style>
