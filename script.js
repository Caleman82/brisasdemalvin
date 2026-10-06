/* Small progressive enhancements; no external dependencies. */
(() => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#navegacion');
  if (menu && nav) {
    const closeMenu = (returnFocus = false) => {
      const wasOpen = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      if (returnFocus && wasOpen) menu.focus();
    };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu(true);
    });
    window.matchMedia('(min-width: 1021px)').addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
    window.addEventListener('pageshow', () => closeMenu());
  }

  const dialog = document.querySelector('#lightbox');
  if (dialog) {
    let trigger = null;
    document.querySelectorAll('[data-image]').forEach(button => {
      button.addEventListener('click', () => {
        trigger = button;
        const image = dialog.querySelector('img');
        image.src = button.dataset.image;
        image.alt = button.querySelector('img').alt;
        dialog.querySelector('p').textContent = image.alt;
        if (!dialog.open) dialog.showModal();
        document.body.classList.add('lightbox-open');
      });
    });
    dialog.querySelector('.close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('lightbox-open');
      if (trigger) trigger.focus();
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  const videos = document.querySelectorAll('video');
  videos.forEach(video => video.addEventListener('play', () => {
    videos.forEach(other => { if (other !== video) other.pause(); });
  }));
})();
