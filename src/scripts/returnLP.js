export const ReturnLP = () => {
  const floatElems = document.querySelectorAll('.js-float');
  const isInputHidden = sessionStorage.getItem('hide-pagespeedInput') === 'true';
  const isResultHidden = sessionStorage.getItem('hide-pagespeedResult') === 'true';
  const isMonitorHidden = sessionStorage.getItem('hide-monitorInput') === 'true';

  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('pagespeed');
  const monitorParam = urlParams.get('monitor');

  const session = sessionStorage.getItem('pageSpeedStep');
  const monitorSession = sessionStorage.getItem('monitorStep');

  const btns = document.querySelectorAll('.js-float-control');

  const pageSpeedParam = param || session;
  const SetmonitorParam = monitorParam || monitorSession;

  if (param) {
    sessionStorage.setItem('pageSpeedStep', param);
  }

  if (monitorParam) {
    sessionStorage.setItem('monitorStep', monitorParam);
  }

  const idMap = {
    input: 'pagespeedInput',
    result: 'pagespeedResult',
    monitor: 'monitorInput',
  }

  floatElems.forEach(el => {
    const id = el.id;

    const shouldHide =
      (id === 'pagespeedInput' && isInputHidden) ||
      (id === 'pagespeedResult' && isResultHidden) ||
      (id === 'monitorInput' && isMonitorHidden);

    const isMatched =
      id === idMap[pageSpeedParam] ||
      (SetmonitorParam === 'input' && id === idMap.monitor);

    if (!isMatched || shouldHide) {
      el.remove();
    } else {
      el.classList.add('c-back-lp--is-view');
      el.setAttribute('tabindex', "");
      el.setAttribute('aria-hidden', false);
    }
  })

  btns.forEach(el => {
    el.addEventListener('click', () => {
      const targetId = el.getAttribute('aria-controls');
      const target = document.getElementById(targetId || '');
      if (target) {
        target.classList.remove('c-back-lp--is-view');
        target.setAttribute('aria-hidden', 'true');
        target.setAttribute('tabindex', '-1');
        sessionStorage.setItem(`hide-${targetId}`, 'true');
      }
    })
  })
}
