<template>
  <div
    class="group-wrapper"
    ref="groupRef"
  >
    <div
      class="group-name"
      @click="onGroupNameClick"
    >
      <div>{{ group.groupName }}</div>
      <img
        class="chevron-icon"
        :src="icon"
        alt="chevron"
      />
    </div>

    <div
      class="items"
      ref="itemsRef"
    >
      <div
        class="items-wrapper"
        ref="itemsWrapperRef"
      >
        <Item
          v-for="item in group.items"
          :key="item.name"
          :item="item"
          :excludeSharp="excludeSharp"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import Item from './Item.vue';

const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
  excludeSharp: {
    type: Boolean,
    default: true,
  },
});

const groupRef = ref();
const itemsRef = ref();
const icon = ref('/icons/chevron-down.svg');

function onGroupNameClick() {
  if (itemsRef.value.style.gridTemplateRows === '0fr') {
    itemsRef.value.style.gridTemplateRows = '1fr';
    groupRef.value.style.marginBottom = '20px';
    icon.value = '/icons/chevron-down.svg';
  } else {
    itemsRef.value.style.gridTemplateRows = '0fr';
    groupRef.value.style.marginBottom = '0px';
    icon.value = '/icons/chevron-up.svg';
  }
}
</script>

<style scoped>
.group-wrapper {
  margin-bottom: 20px;
}

.group-name {
  display: flex;
  justify-content: space-between;
  background: var(--bg-color-accent);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}

.chevron-icon {
  filter: invert(var(--filter-invert));
}

.items {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  transition: all 0.3s ease-in-out;
}

.items-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 10px;
  overflow: hidden;
}
</style>
