const EN_LAYOUT = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';
const RU_LAYOUT = 'ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,';

const LAYOUTS = {
  EN: '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?',
  RU: 'ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,',
};

function mapLayouts(sourceLayout, targetLayout) {
  const mappedLayouts = sourceLayout.reduce((accumulator, currentValue, index) => {
    return {
      ...accumulator,
      [currentValue]: targetLayout[index],
    };
  }, {});

  return mappedLayouts;
}

const switchLayout = (source, target, text) => {
  const sourceLayout = Array.from(LAYOUTS[source.toUpperCase()]);
  const targetLayout = Array.from(LAYOUTS[target.toUpperCase()]);

  const mappedLayouts = mapLayouts(sourceLayout, targetLayout);

  return Array.from(text).map((char) => mappedLayouts[char] ?? char).join('');
};

export default switchLayout;
