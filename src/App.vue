<template>
  <header class="header">
    <div class="search">
      <label>
        <span>Поиск </span>
        <input
          type="text"
          v-model="filter"
          class="filter-input"
        />
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
          ></Group>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import Group from './components/Group.vue';
import Theme from './components/Theme.vue';

import ITEMS from './assets/items.data.js';

const filter = ref('');
const excludeSharp = ref(true);

const filteredItems = computed(() => {
  return ITEMS.map((item) => ({
    groupName: item.groupName,
    items: item.items.filter((item) => item.name.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase())),
  }));
});
</script>

<style scoped>
.main {
  padding: 10px;
}

.header {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.search {
  display: flex;
  justify-content: center;
}

.filter-input {
  padding: 5px;
  border-radius: 8px;
  border: none;
  outline: none;
  text-align: center;
  border: 1px solid var(--bg-color-invert);
}

.sharp label {
  cursor: pointer;
}

.theme-toggler-wrapper {
  margin-left: auto;
}

.group {
  display: grid;
  gap: 10px;
}
</style>
