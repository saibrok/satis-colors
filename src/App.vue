<script setup>
import { ref, computed } from 'vue';
import Item from './components/Item.vue';

import ITEMS from './assets/items.data.js';

const filter = ref('');

const filteredItems = computed(() => {
  return ITEMS.map((item) => ({
    groupName: item.groupName,
    items: item.items.filter((item) => item.name.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase())),
  }));
});
</script>

<template>
  <main class="main">
    <div class="search">
      <label>
        Поиск:
        <input
          type="text"
          v-model="filter"
          class="filter-input"
        />
      </label>
    </div>

    <div class="group-list">
      <div
        v-for="groups in filteredItems"
        :key="groups.groupName"
        class="group"
      >
        <template v-if="groups.items.length > 0">
          <div class="group-wrapper">
            <div class="group-name">{{ groups.groupName }}</div>
            <div class="items">
              <Item
                v-for="item in groups.items"
                :key="item.name"
                :item="item"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  padding: 10px;
}

.search {
  display: flex;
  justify-content: center;
}

.filter-input {
  margin-bottom: 20px;
}

.group {
  display: grid;
  gap: 10px;
}

.group-wrapper {
  margin-bottom: 20px;
}

.group-name {
  background: var(--bg-color-accent);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.items {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

@media (max-width: 2100px) {
  .items {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1700px) {
  .items {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1440px) {
  .items {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .items {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
