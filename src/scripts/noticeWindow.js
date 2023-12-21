export const noticeWindow = () => {
  let btn = document.querySelector("#noticeBtn");
  let bg = document.querySelector(".c-notice-bg");
  let box = document.querySelector("#noticeWindow");
  let closeBtn = document.querySelector("#closeBtn");
  let setBtn = document.querySelector("#settingBtn");
  let label = document.querySelector(".c-status-text");

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

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(function(OneSignal) {
    OneSignal.init({
      appId: "48fb422b-f2fa-4483-9a7d-52c04255a9c9",
    });
    function statusCheck() {
      if(Notification.permission === 'denied') {
        label.textContent = "オフ";
        setBtn.textContent = "通知は拒否されています";
        setBtn.disabled = true;
      } else if(Notification.permission === 'default') {
        label.textContent = "オフ";
        setBtn.textContent = "通知をオンにする";
        setBtn.disabled = false;
      } else {
        if(OneSignal.User.PushSubscription.optedIn) {
          label.textContent = "オン";
          setBtn.textContent = "通知をオフにする";
          setBtn.disabled = false;
        } else {
          label.textContent = "オフ";
          setBtn.textContent = "通知をオンにする";
          setBtn.disabled = false;
        }
      }
    }
    OneSignal.User.PushSubscription.addEventListener("change", () => {
      statusCheck();
    });
    setBtn.addEventListener('click', () => {
      if(Notification.permission === 'default') {
        OneSignal.Notifications.requestPermission();
      } else if(Notification.permission === 'granted') {
        if(OneSignal.User.PushSubscription.optedIn) {
          OneSignal.User.PushSubscription.optOut();
        } else {
          OneSignal.User.PushSubscription.optIn();
        }
      }
      setBtn.blur();
    });
    btn.addEventListener("click", () => {
      statusCheck();
      setTimeout(check, 100);
    });
  });
  closeBtn.addEventListener("click", () => {
    setTimeout(check, 100);
  });
  bg.addEventListener("click", () => {
    check();
  });
  window.addEventListener("resize", () => {
    check();
  });
};
