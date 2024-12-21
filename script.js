document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('*');
  const bodyWidth = document.body.scrollWidth;

  elements.forEach(el => {
    const elWidth = el.scrollWidth;
    const elOffset = el.getBoundingClientRect();

    // Перевірка ширини елемента
    if (elWidth > bodyWidth) {
      console.warn(
        'Element causing horizontal scroll:',
        el.tagName,
        el.className || '(no class)',
        el.id || '(no id)',
        el
      );
      el.style.outline = '2px solid red';
    }

    // Перевірка на вихід за межі вікна браузера
    if (elOffset.left < 0 || elOffset.right > window.innerWidth) {
      console.warn(
        'Element overflowing viewport:',
        el.tagName,
        el.className || '(no class)',
        el.id || '(no id)',
        el
      );
      el.style.outline = '2px solid red';
    }

    // Перевірка відносно контейнера батьківського
    const parent = el.parentElement;
    if (parent) {
      const parentRect = parent.getBoundingClientRect();
      if (elOffset.right > parentRect.right) {
        console.warn(
          'Element overflowing parent container:',
          el.tagName,
          el.className || '(no class)',
          el.id || '(no id)',
          el
        );
        el.style.outline = '2px solid orange';
      }
    }

    // Перевірка на переповнення тексту в <p>
    if (
      el.tagName === 'P' ||
      el.tagName === 'H1' ||
      el.tagName === 'H2' ||
      el.tagName === 'H3' ||
      el.tagName === 'H4' ||
      el.tagName === 'SPAN'
    ) {
      const span = document.createElement('span');
      span.style.position = 'absolute';
      span.style.whiteSpace = 'nowrap';
      span.style.visibility = 'hidden';
      span.textContent = el.textContent;
      document.body.appendChild(span);

      if (span.scrollWidth > el.clientWidth) {
        console.warn(
          'Text overflowing in paragraph:',
          el.tagName,
          el.className || '(no class)',
          el.id || '(no id)',
          el
        );
        el.style.outline = '2px solid blue';
      }

      document.body.removeChild(span);
    }
  });

  if (document.body.scrollWidth > window.innerWidth) {
    console.warn('Horizontal scroll exists on the page.');
  } else {
    console.log('No horizontal scroll detected.');
  }
});
