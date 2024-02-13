  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const image = new Image();
  image.src = props.item.image;

  image.addEventListener('load', () => {
    context.drawImage(image, 0, 0, 4, 4);

    const colors = Array.from(context.getImageData(0, 0, 4, 4).data);

    const size = 4;
    const subarray = [];

    for (let i = 0; i < Math.ceil(colors.length / size); i++) {
      const color = colors.slice(i * size, i * size + size);

      if (color[3] === 255) {
        const hex = `#${decToHex(color[0])}${decToHex(color[1])}${decToHex(color[2])}`.toUpperCase();
        subarray.push(hex);
        // const hsl = `hsl(${rgbToHsl(color[0], color[1], color[2])})`;
        // subarray.push(hsl);
      }
    }

    subarray.sort();

    // const result = subarray.reduce(function (acc, el) {
    //   acc[el] = (acc[el] || 0) + 1;

    //   return acc;
    // }, {});

    // const entries = Object.entries(result);

    // entries.sort((a, b) => b[1] - a[1]);

    // console.log('LOG ::: entries:', entries);

    // entries.length = 100;

    // basicColors.value = entries.map((color) => color[0]);
    basicColors.value = subarray;
  });

  image.onload = function () {
    context.drawImage(image, 0, 0);
    // context.getImageData(0, 0, 128, 128); // после загрузки картинки обновляем данные
  };

  // context.getImageData(0, 0, 128, 128);

  context.drawImage(image, 0, 0);

  const rgba = context.getImageData(x, y, 1, 1).data;

  for (let x = 1; x < 128; x++) {
    for (let y = 1; y < 128; y++) {
      // console.log('color:', context.getImageData(0, 0, x, y).data.join(','));
      // console.log('LOG ::: x-y:', x, y);
    }
  }