<script setup>
import { ref } from 'vue';

defineExpose({ show });

const xPosition = ref(0);
const yPosition = ref(0);
const copiedColor = ref('');
const isVsible = ref(false);

function show(x, y, color) {
  xPosition.value = x;
  yPosition.value = y;
  copiedColor.value = color;

  isVsible.value = true;

  setTimeout(() => {
    isVsible.value = false;
  }, 1000);
}
</script>

<template>
  <Transition>
    <div
      v-if="isVsible"
      class="tooltip"
      :style="{ left: xPosition + 'px', top: yPosition - 60 + 'px' }"
    >
      <div class="text">Скопировано!</div>
      <div>{{ copiedColor }}</div>
    </div>
  </Transition>
</template>

<style scoped>
.tooltip {
  position: fixed;
  background-color: var(--bg-color-accent);
  padding: 10px;
  border-radius: 8px;
  z-index: 1;
  transform: translateX(-50%);
  pointer-events: none;
  text-align: center;
}

.text {
  margin-bottom: 5px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
