export const oneSignal = () => {
  let btn = document.querySelector("#settingBtn");

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(function(OneSignal) {
    OneSignal.init({
      appId: "48fb422b-f2fa-4483-9a7d-52c04255a9c9",
    });
    btn.addEventListener('click', () => {
      OneSignal.Notifications.requestPermission();
    });
    OneSignal.Notifications.addEventListener("permissionChange", () => {
      const permission = OneSignal.Notifications.permission;
      console.log(permission);
    });
  });
}
