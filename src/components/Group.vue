<template>
  <div
    class="group-wrapper"
    ref="groupRef"
  >
    <div
      class="group-name"
      @click="toggleCollapse"
    >
      <div>{{ $t(`groups.${group.groupName}`) }}</div>
      <img
        class="chevron-icon"
        src="/icons/chevron-down.svg"
        alt="chevron"
        ref="refImg"
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
import { ref, onMounted } from 'vue';
import Item from './Item.vue';

const refImg = ref();

defineExpose({ openGroup, closeGroup });

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

function closeGroup() {
  itemsRef.value.style.gridTemplateRows = '0fr';
  groupRef.value.style.marginBottom = '0px';
  refImg.value.style.transform = 'rotate(180deg)';
}

function openGroup() {
  itemsRef.value.style.gridTemplateRows = '1fr';
  groupRef.value.style.marginBottom = '20px';
  refImg.value.style.transform = 'rotate(0deg)';
}

function toggleCollapse() {
  if (itemsRef.value.style.gridTemplateRows === '0fr') {
    openGroup();
  } else {
    closeGroup();
  }
}

onMounted(() => {
  itemsRef.value.style.gridTemplateRows === '0fr';
});
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
  transition: 0.3s transform ease;
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
}
</style>
