/**
 * cookie-banner.js — Лаборатория 404
 * Показывает баннер согласия на cookie.
 * Яндекс Метрика загружается только после согласия.
 */

(function () {
  'use strict';

  /* ─── Конфигурация ─────────────────────────────────────────── */
  var YM_ID = '109700660';
  var FB_PIXEL_ID = '1542488367626641';
  var COOKIE_NAME = 'lab404_cookie_consent';
  var COOKIE_DAYS = 365;

  /* ─── Утилиты cookie ───────────────────────────────────────── */
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  function getCookie(name) {
    var v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return v ? v.pop() : null;
  }

  /* ─── Яндекс Метрика ───────────────────────────────────────── */
  function loadYandexMetrika() {
    if (window._ymLoaded) return;
    window._ymLoaded = true;

    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) return;
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    ym(YM_ID, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
  }

  /* ─── Meta Pixel ───────────────────────────────────────────── */
  function loadMetaPixel() {
    if (window._fbLoaded) return;
    window._fbLoaded = true;

    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', FB_PIXEL_ID);
    fbq('track', 'PageView');
  }

  /* ─── Стили баннера ────────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('lab404-cookie-styles')) return;
    var css = [
      '#lab404-cookie-banner {',
      '  position: fixed;',
      '  bottom: 24px;',
      '  left: 50%;',
      '  transform: translateX(-50%);',
      '  z-index: 99999;',
      '  width: calc(100% - 32px);',
      '  max-width: 680px;',
      '  background: rgba(15, 23, 42, 0.97);',
      '  border: 1px solid rgba(34, 211, 238, 0.25);',
      '  border-radius: 16px;',
      '  padding: 20px 24px;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 14px;',
      '  box-shadow: 0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.08);',
      '  backdrop-filter: blur(12px);',
      '  font-family: Inter, sans-serif;',
      '  animation: lab404-slide-up 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);',
      '}',
      '@keyframes lab404-slide-up {',
      '  from { transform: translateX(-50%) translateY(30px); opacity: 0; }',
      '  to   { transform: translateX(-50%) translateY(0);   opacity: 1; }',
      '}',
      '#lab404-cookie-banner.lab404-hide {',
      '  animation: lab404-slide-down 0.25s ease-in forwards;',
      '}',
      '@keyframes lab404-slide-down {',
      '  to { transform: translateX(-50%) translateY(24px); opacity: 0; }',
      '}',
      '#lab404-cookie-banner .cb-text {',
      '  font-size: 13px;',
      '  line-height: 1.65;',
      '  color: #94a3b8;',
      '}',
      '#lab404-cookie-banner .cb-text a {',
      '  color: #22d3ee;',
      '  text-decoration: none;',
      '  border-bottom: 1px solid rgba(34,211,238,0.35);',
      '  transition: border-color 0.2s;',
      '}',
      '#lab404-cookie-banner .cb-text a:hover {',
      '  border-color: #22d3ee;',
      '}',
      '#lab404-cookie-banner .cb-actions {',
      '  display: flex;',
      '  gap: 10px;',
      '  flex-wrap: wrap;',
      '}',
      '#lab404-cookie-banner .cb-btn-accept {',
      '  flex: 1 1 160px;',
      '  background: #22d3ee;',
      '  color: #020617;',
      '  border: none;',
      '  border-radius: 99px;',
      '  padding: 11px 20px;',
      '  font-family: Inter, sans-serif;',
      '  font-size: 13px;',
      '  font-weight: 600;',
      '  cursor: pointer;',
      '  box-shadow: 0 0 14px rgba(34,211,238,0.35);',
      '  transition: box-shadow 0.2s, opacity 0.2s;',
      '  white-space: nowrap;',
      '}',
      '#lab404-cookie-banner .cb-btn-accept:hover {',
      '  box-shadow: 0 0 24px rgba(34,211,238,0.55);',
      '  opacity: 0.92;',
      '}',
      '#lab404-cookie-banner .cb-btn-decline {',
      '  flex: 0 0 auto;',
      '  background: transparent;',
      '  color: #475569;',
      '  border: 1px solid rgba(71,85,105,0.4);',
      '  border-radius: 99px;',
      '  padding: 11px 20px;',
      '  font-family: Inter, sans-serif;',
      '  font-size: 13px;',
      '  font-weight: 400;',
      '  cursor: pointer;',
      '  transition: color 0.2s, border-color 0.2s;',
      '  white-space: nowrap;',
      '}',
      '#lab404-cookie-banner .cb-btn-decline:hover {',
      '  color: #94a3b8;',
      '  border-color: rgba(148,163,184,0.4);',
      '}',
      '@media (max-width: 480px) {',
      '  #lab404-cookie-banner {',
      '    bottom: 12px;',
      '    padding: 16px 16px;',
      '    border-radius: 14px;',
      '  }',
      '  #lab404-cookie-banner .cb-btn-accept,',
      '  #lab404-cookie-banner .cb-btn-decline {',
      '    flex: 1 1 100%;',
      '    text-align: center;',
      '  }',
      '}'
    ].join('\n');

    var s = document.createElement('style');
    s.id = 'lab404-cookie-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ─── Рендер баннера ───────────────────────────────────────── */
  function renderBanner() {
    var banner = document.createElement('div');
    banner.id = 'lab404-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Согласие на использование cookie');
    banner.innerHTML = [
      '<p class="cb-text">',
      '  Мы используем файлы cookie для аналитики (Яндекс Метрика, Meta Pixel) и корректной работы сайта. ',
      '  Нажимая «Принять», вы соглашаетесь с их использованием. ',
      '  <a href="/cookie-policy.html">Политика cookie</a>.',
      '</p>',
      '<div class="cb-actions">',
      '  <button class="cb-btn-accept" id="lab404-cookie-accept">Принять</button>',
      '  <button class="cb-btn-decline" id="lab404-cookie-decline">Только необходимые</button>',
      '</div>'
    ].join('');

    document.body.appendChild(banner);

    document.getElementById('lab404-cookie-accept').addEventListener('click', function () {
      setCookie(COOKIE_NAME, 'accepted', COOKIE_DAYS);
      hideBanner();
      loadYandexMetrika();
      loadMetaPixel();
    });

    document.getElementById('lab404-cookie-decline').addEventListener('click', function () {
      setCookie(COOKIE_NAME, 'declined', COOKIE_DAYS);
      hideBanner();
    });
  }

  function hideBanner() {
    var banner = document.getElementById('lab404-cookie-banner');
    if (!banner) return;
    banner.classList.add('lab404-hide');
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 280);
  }

  /* ─── Инициализация ────────────────────────────────────────── */
  function init() {
    var consent = getCookie(COOKIE_NAME);

    if (consent === 'accepted') {
      loadYandexMetrika();
      loadMetaPixel();
      return;
    }

    if (consent === 'declined') {
      // cookie уже отклонены — ничего не делаем
      return;
    }

    // Нет решения → показываем баннер
    injectStyles();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderBanner);
    } else {
      renderBanner();
    }
  }

  init();
})();
