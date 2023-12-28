export const a2hs = () => {
  let deferredPrompt;
  let btn = document.querySelector("#installBtn");
  let bg = document.querySelector(".c-install-bg");
  let box = document.querySelector("#installWindow");
  let closeBtn = document.querySelector("#installClose");
  let setting = document.querySelector('.c-install-setting');
  let iosText = document.querySelector('.c-ios-howto');

  function init() {
    if (box.getAttribute("tabindex") != "-1") {
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-fixed");
      box.classList.remove("c-notice-box--is-open");
      box.setAttribute("tabindex", "-1");
      box.setAttribute("aria-hidden", "true");
    }
  }

  function check() {
    if (box.getAttribute("tabindex") == "-1") {
      btn.setAttribute("aria-expanded", "true");
      document.body.classList.add("is-fixed");
      box.classList.add("c-notice-box--is-open");
      box.setAttribute("tabindex", "");
      box.setAttribute("aria-hidden", "false");
    } else {
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-fixed");
      box.classList.remove("c-notice-box--is-open");
      box.setAttribute("tabindex", "-1");
      box.setAttribute("aria-hidden", "true");
    }
  }
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
  });
  window.addEventListener('load', () => {
    if ('BeforeInstallPromptEvent' in window) {
      iosText.style.display = 'none';
    } else {
      setting.style.display = 'none';
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      btn.disabled = true;
    }
  });

  if(btn) {
    btn.addEventListener('click', () => {
      btn.blur();
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            btn.disabled = true;
            console.log('User added to home screen');
          } else {
            btn.disabled = true;
            console.log('User cancelled home screen install');
          }
          deferredPrompt = null;
        });
      } else {
        check();
      }
    });
  }
  closeBtn.addEventListener("click", () => {
    check();
    closeBtn.blur();
  });
  bg.addEventListener("click", () => {
    check();
  });
  window.addEventListener("resize", () => {
    init();
  });
}
