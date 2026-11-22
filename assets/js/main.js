/* ES5 vanilla JS: zero dependencies, works on legacy & modern browsers */
(function () {
  function hasClass(el, cls) {
    if (!el) return false;
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') !== -1;
  }

  function addClass(el, cls) {
    if (!el || hasClass(el, cls)) return;
    el.className = el.className ? el.className + ' ' + cls : cls;
  }

  function removeClass(el, cls) {
    if (!el || !hasClass(el, cls)) return;
    el.className = (' ' + el.className + ' ')
      .replace(' ' + cls + ' ', ' ')
      .replace(/^\s+|\s+$/g, '');
  }

  function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  function init() {
    /* 1. Mobile menu toggle */
    var toggleBtn = document.getElementById('menu-toggle');
    var menuList = document.getElementById('menu');
    if (toggleBtn && menuList) {
      toggleBtn.onclick = function () {
        if (hasClass(menuList, 'is-open')) {
          removeClass(menuList, 'is-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
          addClass(menuList, 'is-open');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      };
    }

    /* 2. Desktop logo fade on scroll */
    var logoEl = document.querySelector ? document.querySelector('#nav-section .logo') : null;
    if (logoEl) {
      var onScroll = function () {
        if (getScrollTop() > 400) {
          addClass(logoEl, 'logo-hidden');
        } else {
          removeClass(logoEl, 'logo-hidden');
        }
      };
      if (window.addEventListener) {
        window.addEventListener('scroll', onScroll, false);
      } else if (window.attachEvent) {
        window.attachEvent('onscroll', onScroll);
      }
      onScroll();
    }

    /* 3. "L" key lights-off mode on collection pages */
    var lightsHint = document.getElementById('lights-hint');
    if (lightsHint) {
      var onKeyDown = function (e) {
        e = e || window.event;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        var target = e.target || e.srcElement;
        if (target && target.tagName) {
          var tag = target.tagName.toUpperCase();
          if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        }
        var code = e.which || e.keyCode;
        if (code === 76) { /* L */
          if (hasClass(document.body, 'lights-off')) {
            removeClass(document.body, 'lights-off');
            lightsHint.innerHTML = 'Press "L" to turn OFF lights';
          } else {
            addClass(document.body, 'lights-off');
            lightsHint.innerHTML = 'Press "L" to turn ON lights';
          }
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
      };
      if (document.addEventListener) {
        document.addEventListener('keydown', onKeyDown, false);
      } else if (document.attachEvent) {
        document.attachEvent('onkeydown', onKeyDown);
      }
    }

    /* 4. Contact page email link (keeps plain address out of raw HTML scrapers) */
    var emailLink = document.getElementById('email-joe-link');
    if (emailLink) {
      var u = emailLink.getAttribute('data-u');
      var d = emailLink.getAttribute('data-d');
      if (u && d) {
        emailLink.setAttribute('href', 'mailto:' + u + '@' + d);
      }
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', init, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', init);
  }
})();
