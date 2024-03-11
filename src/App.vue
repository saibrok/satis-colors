<template>
  <header class="header">
    <div class="search">
      <label class="search-label">
        <span>Поиск </span>
        <input
          type="text"
          v-model.trim="filter"
          class="filter-input"
        />
        <button
          v-if="filter"
          class="search-clear-button"
          @click="filter = ''"
        >
          X
        </button>
      </label>
    </div>

    <div class="sharp">
      <label>
        <span>Исключить # </span>
        <input
          type="checkbox"
          v-model="excludeSharp"
          class="sharp-checkbox"
        />
      </label>
    </div>

    <div class="collapse">
      <button
        class="collapse-button"
        @click="toggleCollapseAll"
      >
        <span>Свернуть всё</span>
        <img
          class="chevron-icon"
          src="/icons/chevron-down.svg"
          alt="chevron"
          ref="refImg"
        />
      </button>
    </div>

    <div class="theme-toggler-wrapper">
      <Theme />
    </div>
  </header>

  <main class="main">
    <div class="group-list">
      <div
        v-for="group in filteredItems"
        :key="group.groupName"
        class="group"
      >
        <template v-if="group.items.length > 0">
          <Group
            :group="group"
            :excludeSharp="excludeSharp"
            ref="refGoroups"
          ></Group>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';

import switchLayout from './helpers/switch-keyboard-layout.js';

import Group from './components/Group.vue';
import Theme from './components/Theme.vue';

import ITEMS from './assets/items.data.js';

const filter = ref('');
const excludeSharp = ref(true);
const refGoroups = ref();
const refImg = ref();

const filteredItems = computed(() => {
  return ITEMS.map((item) => ({
    groupName: item.groupName,
    items: item.items.filter((item) => {
      return (
        item.name.toLowerCase().includes(filter.value.toLowerCase())
        || item.name.toLowerCase().includes(switchLayout('en', 'ru', filter.value.toLowerCase()))
      );
    }),
  }));
});

function toggleCollapseAll() {
  refGoroups.value.forEach((group) => {
    group.toggleCollapse();
  });

  if (refImg.value.style.transform === 'rotate(180deg)') {
    refImg.value.style.transform = 'rotate(0deg)';
  } else {
    refImg.value.style.transform = 'rotate(180deg)';
  }
}
</script>

<style scoped>
.main {
  padding: 10px;
}

.header {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
}

.search {
  display: flex;
  position: relative;
}

.search-clear-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  border-radius: 8px;
  padding: 5px 10px;
  cursor: pointer;
}

.filter-input {
  padding: 5px;
  border-radius: 8px;
  border: none;
  outline: none;
  border: 1px solid var(--bg-color-invert);
}

.sharp label {
  cursor: pointer;
}

.collapse-button {
  display: flex;
  column-gap: 10px;
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: var(--bg-color-accent);
  color: var(--text-color-primary);
  cursor: pointer;
}

.chevron-icon {
  transition: 0.3s transform ease;
  filter: invert(var(--filter-invert));
}

.group {
  display: grid;
  gap: 10px;
}
</style>
