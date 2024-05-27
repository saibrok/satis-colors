<template>
  <header class="header">
    <div class="search">
      <label class="search-label">
        <span>{{ $t('messages.search') }}</span>

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
        <span>{{ $t('messages.exclude') }} # </span>
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
        <span>{{ $t('messages.collapse') }}</span>
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

    <button
      class="language-button"
      @click="onClick"
    >
      lng: {{ language }}
    </button>

    <div>
      <div class="hint">ctrl + click => {{ $t('messages.favorite') }}</div>
      <div class="hint">ctrl + click => {{ $t('messages.remove') }}</div>
    </div>
  </header>

  <main class="main">
    <div
      class="group-list"
      ref="refGroups"
    >
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

  <footer class="footer">Feedback: <a href="mailto:litvinsergey@list.ru">litvinsergey@list.ru</a> | © 2024</footer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import switchLayout from './helpers/switch-keyboard-layout';
import locale from './helpers/get-language';

import Group from './components/Group.vue';
import Theme from './components/Theme.vue';

import ITEMS from './assets/items.data';

const i18n = useI18n();

const filter = ref('');
const excludeSharp = ref(true);
const refGoroups = ref();
const refImg = ref();
const refGroups = ref();
const isCollapsed = ref(false);
const language = ref(locale);

function onClick() {
  if (language.value === 'ru') {
    i18n.locale.value = 'en';
    language.value = 'en';
    localStorage.setItem('language', 'en');
  } else if (language.value === 'en') {
    i18n.locale.value = 'ru';
    language.value = 'ru';
    localStorage.setItem('language', 'ru');
  }
}

const filteredItems = computed(() => {
  return ITEMS.map((item) => ({
    groupName: item.groupName,
    items: item.items
      .map((item) => {
        return {
          ...item,
          localizedName: i18n.t(`items.${item.name}`),
        };
      })
      .filter((item) => {
        return (
          item.localizedName.toLowerCase().includes(filter.value.toLowerCase()) ||
          item.localizedName.toLowerCase().includes(switchLayout('en', 'ru', filter.value.toLowerCase()))
        );
      }),
  }));
});

function toggleCollapseAll() {
  if (isCollapsed.value) {
    refImg.value.style.transform = 'rotate(0deg)';

    refGoroups.value.forEach((group) => {
      group.openGroup();
    });

    isCollapsed.value = false;
  } else {
    refImg.value.style.transform = 'rotate(180deg)';

    refGoroups.value.forEach((group) => {
      group.closeGroup();
    });

    isCollapsed.value = true;
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--bg-color-primary);
  z-index: 1;
}

.main {
  padding: 51px 10px 35px;
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

.language-button {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.hint {
  font-size: var(--text-size-decreased);
}

.chevron-icon {
  transition: 0.3s transform ease;
  filter: invert(var(--filter-invert));
}

.group {
  display: grid;
  gap: 10px;
}

.footer {
  padding: 10px;
  background-color: var(--bg-color-invert);
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: var(--text-size-decreased);
}
</style>
