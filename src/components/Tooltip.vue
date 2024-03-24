<script setup>
import { ref } from 'vue';

defineExpose({ show });

const xPosition = ref(0);
const yPosition = ref(0);
const copiedText = ref('');
const isVsible = ref(false);

function show(x, y, text) {
  xPosition.value = x;
  yPosition.value = y;
  copiedText.value = text;

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
      <div class="text">{{ $t('messages.copied') }}</div>
      <div class="copied-text">[ {{ copiedText }} ]</div>
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
  border: 1px solid var(--bg-color-invert);
}

.text {
  margin-bottom: 5px;
}

.copied-text {
  font-weight: 700;
  font-size: var(--text-size-primary);
  color: var(--text-color-primary);
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
