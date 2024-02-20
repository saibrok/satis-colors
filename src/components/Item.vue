<template>
  <div class="item">
    <div class="content">
      <div class="image-wrapper">
        <img
          ref="imageEl"
          class="image"
          :src="item.image"
        />
      </div>
      <div
        class="color"
        :style="{ backgroundColor: dominantColor, color: getContrast(dominantColor) ? 'black' : 'white' }"
        @click="onClick($event, dominantColor)"
      >
        {{ dominantColor }}
      </div>
      <div class="palette">
        <div
          v-for="color in palette"
          :key="color"
          class="color"
          :style="{ backgroundColor: color, color: getContrast(color) ? 'black' : 'white' }"
          @click="onClick($event, color)"
        >
          {{ color }}
        </div>
      </div>
    </div>

    <div class="name">
      {{ item.name }}
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

function onClick(event, color) {
  const slicedColor = color.slice(props.excludeSharp ? 1 : 0);

  tooltip.value.show(event.clientX, event.clientY, slicedColor);

  copyToClipboard(slicedColor);
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
  height: 180px;
  min-width: 400px;
  flex-grow: 1;
}

.content {
  display: grid;
  grid-template-columns: 128px 1fr 2fr;
  column-gap: 10px;
}

@media (max-width: 500px) {
  .content {
    grid-template-columns: 64px 1fr 2fr;
  }
}

.image-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  row-gap: 10px;
}

.image {
  width: 128px;
  margin: 0 auto;
}

@media (max-width: 500px) {
  .image {
    width: 64px;
  }
}

.name {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
}

.palette {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  font-size: var(--text-size-decreased);
}

.color {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px;
}

.color:hover {
  color: var(--text-color-accent);
}

.tooltip-wrapper {
  position: fixed;
  z-index: 1;
}
</style>
