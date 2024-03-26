<template>
  <div class="item">
    <div class="content">
      <div class="image-wrapper">
        <img
          loading="lazy"
          ref="imageEl"
          class="image"
          :src="item.image"
        />
        <div
          class="dominant-color"
          :style="{ backgroundColor: dominantColor, color: getContrast(dominantColor) ? 'black' : 'white' }"
          @click="onClickDominantColor($event, dominantColor, item.name)"
        >
          <!-- {{ dominantColor }} -->
          <div v-if="localDominantFavoriteColors.includes(item.name)">&#10004;</div>
        </div>
      </div>
      <div class="palette">
        <div
          v-for="(color, index) in palette"
          :key="color"
          class="color"
          :style="{
            backgroundColor: color,
            color: getContrast(color) ? 'black' : 'white',
          }"
          @click="onClickPalette($event, color, index)"
        >
          <!-- {{ color }} -->
          <div v-if="favoriteColors.includes(index)">&#10004;</div>
        </div>
      </div>
    </div>

    <div
      class="name"
      @click="onClickText($event, item.localizedName)"
    >
      {{ $t(`items.${item.name}`) }}
    </div>

    <Tooltip ref="tooltip" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import copyToClipboard from 'copy-to-clipboard';
import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs';

import Tooltip from './Tooltip.vue';

const props = defineProps({
  item: Object,
  excludeSharp: {
    type: Boolean,
    default: true,
  },
});

const imageEl = ref();
const tooltip = ref();

const dominantColor = ref('');
const palette = ref([]);

const favoriteColors = ref([]);

const localFavoriteColors = ref({});
const localDominantFavoriteColors = ref([]);

function decToHex(dec) {
  let hex = dec.toString(16);

  return hex.length < 2 ? (hex = '0' + hex) : hex;
}

function getPercentageOfColorComponent(component) {
  return (parseInt(component, 16) + 1) / 256;
}

function getContrast(color) {
  const red = color.slice(1, 3);
  const green = color.slice(3, 5);
  const blue = color.slice(5, 7);

  const contrast =
    getPercentageOfColorComponent(red) + getPercentageOfColorComponent(green) + getPercentageOfColorComponent(blue);

  return contrast > 1.4;
}

function getLocalFavoriteColors() {
  localFavoriteColors.value = JSON.parse(localStorage.getItem('favoriteColors')) || {};

  favoriteColors.value = localFavoriteColors.value[props.item.name] || [];
}

function getDominantFavoriteColors() {
  localDominantFavoriteColors.value = JSON.parse(localStorage.getItem('dominantFavoriteColors')) || [];
}

function copyText(event, text) {
  tooltip.value.show(event.clientX, event.clientY, text);

  copyToClipboard(text);
}

function onClickColor(event, color) {
  const slicedColor = color.replace(props.excludeSharp ? '#' : '', '');

  copyText(event, slicedColor);
}

function onClickDominantColor(event, color, name) {
  if (event.metaKey || event.ctrlKey) {
    getDominantFavoriteColors();

    if (localDominantFavoriteColors.value.includes(name)) {
      localDominantFavoriteColors.value.splice(
        localDominantFavoriteColors.value.findIndex((colorName) => colorName === name),
        1
      );
    } else {
      localDominantFavoriteColors.value.push(name);
    }

    localStorage.setItem('dominantFavoriteColors', JSON.stringify(localDominantFavoriteColors.value));
  } else {
    onClickColor(event, color);
  }
}

function onClickPalette(event, color, index) {
  if (event.metaKey || event.ctrlKey) {
    getLocalFavoriteColors();

    if (favoriteColors.value.some((colorIndex) => colorIndex === index)) {
      favoriteColors.value = favoriteColors.value.filter((colorIndex) => colorIndex !== index);
    } else {
      favoriteColors.value.push(index);
    }

    localFavoriteColors.value[props.item.name] = favoriteColors.value;

    localStorage.setItem('favoriteColors', JSON.stringify(localFavoriteColors.value));
  } else {
    onClickColor(event, color);
  }
}

function onClickText(event, text) {
  copyText(event, text);
}

function setColors(img) {
  const colorThief = new ColorThief();
  const dominantColorArr = colorThief.getColor(img);

  dominantColor.value = dominantColorArr.reduce((acc, el) => {
    return acc + decToHex(el).toUpperCase();
  }, '#');

  const paletteArr = colorThief.getPalette(img, 12, 10);

  palette.value = paletteArr.map((color) => {
    return color.reduce((acc, el) => {
      return acc + decToHex(el).toUpperCase();
    }, '#');
  });

  palette.value.sort();
}

onMounted(() => {
  const img = imageEl.value;

  if (img.complete) {
    setColors(img);
  } else {
    img.addEventListener('load', function () {
      setColors(img);
    });
  }

  getLocalFavoriteColors();
  getDominantFavoriteColors();
});
</script>

<style scoped>
.item {
  position: relative;
  background-color: var(--bg-color-neutral);
  display: grid;
  gap: 10px;
  padding: 10px;
  border-radius: 16px;
  font-size: var(--text-size-decreased);
  justify-content: center;
}

.content {
  display: grid;
  grid-template-columns: 64px 1fr;
  column-gap: 10px;
}

.image-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  row-gap: 15px;
}

.image {
  width: 64px;
  margin: 0 auto;
}

.name {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: scale 0.3s ease;
  line-height: normal;
}

.name:hover {
  scale: 1.2;
}

.palette {
  display: grid;
  grid-template-columns: repeat(3, 32px);
  gap: 5px;
}

.dominant-color {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px;
  transition: scale 0.3s ease;
  border-radius: 100%;
  border: 1px solid var(--bg-color-invert);
}

.dominant-color:hover {
  scale: 1.2;
  color: var(--text-color-accent);
}

.color {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  border-radius: 100%;
  transition: scale 0.3s ease;
  border: 1px solid var(--bg-color-invert);
}

.color:hover {
  scale: 1.2;
  color: var(--text-color-accent);
}

.tooltip-wrapper {
  position: fixed;
  z-index: 1;
}
</style>
