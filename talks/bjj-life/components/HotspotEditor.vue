<template>
  <div class="w-full flex flex-col items-center space-y-4">
    <input type="file" accept="image/*" @change="onImageUpload" class="mb-4 p-2 border border-gray-300 rounded"/>

    <div
      v-if="imageSrc"
      class="relative w-full h-full max-w-[50%] max-h-[50%] flex justify-center bg-gray-200 border rounded overflow-hidden"
      @click="addHotspotOnClickContainer"
      style="cursor: crosshair;" >
      <img
        ref="imageEl"
        :src="imageSrc"
        alt="Hotspot image"
        class="block max-w-full max-h-full object-contain" @load="onImageLoad" />

      <div
        v-for="(hotspot, index) in hotspots"
        :key="hotspot.id" class="absolute group"
        :style="hotspotStyle(hotspot)"
        @mousedown.stop.prevent="startDragging($event, index)"
        @dblclick.stop="startEditingLabel(index)" style="cursor: move;" >

        <div class="w-full h-full rounded-full bg-black opacity-50 flex items-center justify-center group-hover:opacity-75 transition-opacity">
          <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span
              v-if="hotspot.label && editingIndex !== index"
              class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs bg-white px-1 rounded border shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            {{ hotspot.label }}
          </span>
        </div>

        <input
          v-if="editingIndex === index"
          :ref="el => { if (el) labelInputRefs[index] = el }" v-model="hotspot.label"
          placeholder="Label"
          type="text" class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-white px-1 rounded border shadow z-10 min-w-[60px]"
          @click.stop @blur="stopEditingLabel" @keydown.enter.prevent="stopEditingLabel" @mousedown.stop />

        <button
          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-large leading-none flex items-center justify-center opacity-1 group-hover:opacity-100 transition-opacity"
          title="Delete hotspot"
          @click.stop="deleteHotspot(index)"
          @mousedown.stop >
          ×
        </button>
      </div>
    </div>

    <div v-if="imageSrc" class="text-sm text-gray-600 mt-2">
      Click on the image to add a hotspot. Double-click a hotspot to edit its label. Drag to move.
    </div>
    <div v-if="hotspots.length > 0 && imageSrc" class="flex justify-end w-full space-x-4 mt-4">
      <button
        @click="copyCode"
        class="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition-colors"
      >
        Save Hotspots
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'

const imageSrc = ref(null) // For display (Data URL)
const imageFilename = ref(null) // For copied code (Original filename)
const imageEl = ref(null) // Ref for the <img> element
const hotspots = reactive([]) // Array of hotspot objects
const editingIndex = ref(null) // Index of the hotspot being edited, null if none
const labelInputRefs = ref([]) // Array to hold refs for label inputs

let nextHotspotId = 0; // Simple unique ID generator for v-for keys

// --- Image Handling ---
function onImageUpload(e) {
  const file = e.target.files[0]
  if (file) {
    imageFilename.value = file.name; // Capture the filename
    const reader = new FileReader()
    reader.onload = () => {
      imageSrc.value = reader.result // Set Data URL for display
      // Reset state for new image
      hotspots.splice(0, hotspots.length)
      editingIndex.value = null
      labelInputRefs.value = []
      nextHotspotId = 0;
    }
    reader.readAsDataURL(file)
  } else {
      // Handle if the user cancels file selection
      imageSrc.value = null;
      imageFilename.value = null; // Clear filename too
      hotspots.splice(0, hotspots.length);
      editingIndex.value = null;
      labelInputRefs.value = []
      nextHotspotId = 0;
  }
}

// Optional: Hook called after the <img @load event
function onImageLoad() {
  console.log('Image loaded and rendered');
  // Perform any actions that depend on the final image dimensions being available
}


// --- Hotspot Management ---
function addHotspotOnClickContainer(e) {
    // Ensure the click is directly on the image element, not on existing hotspots or controls
    // Also check we are not currently editing a label
    if (e.target === imageEl.value && editingIndex.value === null) {
        addHotspot(e);
    }
}

function addHotspot(e) {
  // Ensure imageEl ref is valid
  if (!imageEl.value) return;

  const rect = imageEl.value.getBoundingClientRect()
  // Calculate position relative to the image's displayed dimensions
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100

  // Prevent adding hotspots outside the image bounds (coordinates should be 0-100)
   if (x < 0 || x > 100 || y < 0 || y > 100) {
    console.warn("Attempted to add hotspot outside image bounds.");
    return;
  }

  hotspots.push({
    id: nextHotspotId++, // Assign unique ID for key prop
    x: x, // Percentage
    y: y, // Percentage
    width: 30, // Hotspot visual size in px
    height: 30,// Hotspot visual size in px
    label: '' // Initial empty label
  })
}

function deleteHotspot(index) {
  // If deleting the hotspot currently being edited, stop editing first
  if (editingIndex.value === index) {
    stopEditingLabel();
  }
  hotspots.splice(index, 1)
   // Adjust labelInputRefs array to keep it aligned (though Vue might handle this)
   if (labelInputRefs.value[index]) {
       labelInputRefs.value.splice(index, 1);
   }
}

function hotspotStyle(hotspot) {
  const isCurrentlyEditing = editingIndex.value === hotspots.findIndex(h => h.id === hotspot.id);
  return {
    // Position is relative to the image container
    top: `${hotspot.y}%`,
    left: `${hotspot.x}%`,
    // Width and height of the hotspot element
    width: `${hotspot.width}px`,
    height: `${hotspot.height}px`,
    // Center the hotspot visually on its (x, y) coordinate
    transform: 'translate(-50%, -50%)',
    position: 'absolute', // Crucial for top/left positioning
    zIndex: isCurrentlyEditing ? 10 : 5, // Bring editing hotspot's input to front
  }
}

// --- Dragging Logic ---
const dragInfo = reactive({
  draggingIndex: null, // Index of hotspot being dragged
  startX: 0,           // Initial mouse X (client coords)
  startY: 0,           // Initial mouse Y (client coords)
  initialHotspotX: 0,  // Initial hotspot X (percentage)
  initialHotspotY: 0,  // Initial hotspot Y (percentage)
})

function startDragging(event, index) {
  // Prevent dragging if a label input is currently active/focused
  if (editingIndex.value !== null || event.target.tagName === 'INPUT') return;

  dragInfo.draggingIndex = index;
  // Record starting mouse position relative to the viewport
  dragInfo.startX = event.clientX;
  dragInfo.startY = event.clientY;
  // Record starting hotspot position in percentages
  dragInfo.initialHotspotX = hotspots[index].x;
  dragInfo.initialHotspotY = hotspots[index].y;

  // Add listeners to the window for smooth dragging outside the element bounds
  window.addEventListener('mousemove', handleDrag);
  window.addEventListener('mouseup', stopDragging);
}

function handleDrag(event) {
  // Ensure dragging is active and image element exists
  if (dragInfo.draggingIndex === null || !imageEl.value) return;

  event.preventDefault(); // Essential to prevent text selection, etc. during drag

  const rect = imageEl.value.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return; // Avoid division by zero if image hasn't loaded dimensions

  // Calculate the total change in mouse position from the start
  const deltaX = event.clientX - dragInfo.startX;
  const deltaY = event.clientY - dragInfo.startY;

  // Convert this pixel delta into a percentage delta based on the image's current rendered size
  const deltaPercentX = (deltaX / rect.width) * 100;
  const deltaPercentY = (deltaY / rect.height) * 100;

  // Calculate the new target percentage position
  let newX = dragInfo.initialHotspotX + deltaPercentX;
  let newY = dragInfo.initialHotspotY + deltaPercentY;

  // Clamp the position to stay within the image bounds (0% to 100%)
  hotspots[dragInfo.draggingIndex].x = Math.max(0, Math.min(100, newX));
  hotspots[dragInfo.draggingIndex].y = Math.max(0, Math.min(100, newY));
}

function stopDragging() {
  if (dragInfo.draggingIndex !== null) {
    // Clean up state and remove global listeners
    dragInfo.draggingIndex = null;
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', stopDragging);
  }
}

// --- Label Editing Logic ---
function startEditingLabel(index) {
    // If already editing another label, stop that first
    if (editingIndex.value !== null && editingIndex.value !== index) {
        stopEditingLabel();
    }

    // If clicking the one already being edited, do nothing
    if (editingIndex.value === index) return;

    editingIndex.value = index;

    nextTick(() => {
        // Attempt to focus the input element after Vue renders it
        const inputEl = labelInputRefs.value[index];
        if (inputEl) {
             inputEl.focus();
             inputEl.select(); // Select current text for easy replacement
        } else {
            console.warn(`Could not find input ref for index ${index} immediately after nextTick.`);
        }
    });
}

function stopEditingLabel() {
  if (editingIndex.value !== null) {
     // Optional: Trim whitespace from label upon finishing edit
     if(hotspots[editingIndex.value]) { // Check if hotspot still exists
        hotspots[editingIndex.value].label = hotspots[editingIndex.value].label.trim();
     }
     editingIndex.value = null; // Set editing index back to null
  }
}


// --- Copy Code Output / Save Hotspots ---
function copyCode() {
  // Create a clean array of hotspot data for export, omitting internal IDs etc.
  const hotspotsToCopy = hotspots.map(({ x, y, width, height, label }) => ({
      x: parseFloat(x.toFixed(2)), // Keep reasonable precision
      y: parseFloat(y.toFixed(2)),
      width,
      height,
      label
  }));

  // Determine the image source path for the output
  const outputImageSrc = imageFilename.value
    ? `./${imageFilename.value}` // Prepend './' if filename exists
    : './image.jpg';          // Use a default fallback path if no filename

  // Generate the code snippet using the prefixed filename
  // (Replace Hotspot with your actual display component name if different)
  const generatedCode = `<Hotspot
  imageSrc="${outputImageSrc}" :hotspots='${JSON.stringify(hotspotsToCopy, null, 2)}'
/>`

  navigator.clipboard.writeText(generatedCode)
    .then(() => {
      // Changed alert message slightly to match button text
      alert('Hotspot data copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy code: ', err);
      alert('Failed to copy code. Check browser permissions and console for details.');
    });
}

// --- Lifecycle Hooks for Cleanup ---
onUnmounted(() => {
  // Crucial: Remove window event listeners if the component is destroyed
  // to prevent memory leaks, especially if dragging is interrupted.
  stopDragging();
});

</script>

<style scoped>
/* Scoped styles apply only to this component */
input[type="file"] {
  /* Basic styling for file input */
}

button {
  cursor: pointer;
}

/* Ensure image respects container bounds and aspect ratio */
.relative img {
 /* Ensure block display and containment */
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Smooth transitions for hover effects */
.group .opacity-0 {
    opacity: 0;
}
.group:hover .opacity-100 {
    opacity: 1;
}
.transition-opacity {
    transition: opacity 0.2s ease-in-out;
}
.transition-colors {
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

/* Ensure label input is usable */
input[type="text"] {
    /* min-width: 60px; Applied inline via class */
}
</style>