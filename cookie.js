const YM_ID = XXXXXXXX;

function loadYandexMetrika() {

  if (window.ym) return;

  (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){
          (m[i].a=m[i].a||[]).push(arguments)
      };

      m[i].l = 1 * new Date();

      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];

      k.async = 1;
      k.src = r;

      a.parentNode.insertBefore(k,a);

  })(window, document, "script",
     "https://mc.yandex.ru/metrika/tag.js",
     "ym");

  ym(YM_ID, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
  });
}

document.addEventListener('DOMContentLoaded', () => {

  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <div id="cookie-banner" class="cookie-banner">
      <div class="cookie-inner">

        <div class="cookie-text">
          Мы используем cookie-файлы и сервис Яндекс.Метрика
          для анализа посещаемости сайта и улучшения его работы.
        </div>

        <div class="cookie-actions">
          <button id="cookie-decline" class="cookie-btn-secondary">
            Только необходимые
          </button>

          <button id="cookie-accept" class="cookie-btn-primary">
            Принять
          </button>
        </div>

      </div>
    </div>
    `
  );

  const banner = document.getElementById('cookie-banner');

  const consent = localStorage.getItem('cookieConsent');

  if (consent === 'accepted') {
      loadYandexMetrika();
      return;
  }

  if (consent === 'declined') {
      return;
  }

  banner.classList.add('show');

  document
    .getElementById('cookie-accept')
    .addEventListener('click', () => {

      localStorage.setItem('cookieConsent', 'accepted');

      banner.classList.remove('show');

      loadYandexMetrika();
    });

  document
    .getElementById('cookie-decline')
    .addEventListener('click', () => {

      localStorage.setItem('cookieConsent', 'declined');

      banner.classList.remove('show');
    });
});
