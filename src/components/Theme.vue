<template>
  <div class="theme">
    <span>
      <img
        class="icon"
        src="/icons/moon.svg"
        alt="moon"
      />
    </span>
    <input
      type="checkbox"
      id="switch"
      v-model="theme"
      @click="toggleTheme"
    />
    <label for="switch">Toggle</label>
    <span>
      <img
        class="icon"
        src="/icons/sun.svg"
        alt="sun"
      />
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const theme = ref(false);

function toggleTheme() {
  setTheme(theme.value ? 'dark' : 'light');
}

function setTheme(targetTheme) {
  document.documentElement.setAttribute('data-theme', targetTheme);
  localStorage.setItem('theme', targetTheme);
}

onMounted(() => {
  const storedTheme =
    localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  if (storedTheme) setTheme(storedTheme);

  theme.value = storedTheme === 'light' ? true : false;
});
</script>

<style scoped>
.theme {
  display: flex;
  align-items: center;
  column-gap: 5px;
}

.theme span {
  font-size: 20px;
}

input[type='checkbox'] {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 50px;
  height: 26px;
  background: snow;
  display: block;
  border-radius: 50px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  background: gray;
  border-radius: 22px;
  transition: 1s;
}

input:checked + label {
  background: grey;
}

input:checked + label:after {
  background: snow;
}

input:checked + label:after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

label:active:after {
  width: 30px;
  height: 18px;
  top: 4px;
}

.icon {
  filter: invert(var(--filter-invert));
}
</style>
