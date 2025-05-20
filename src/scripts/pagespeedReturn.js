export const pageSpeedReturn = () => {
  const floatElems = document.querySelectorAll('.js-float');
  const isInputHidden = sessionStorage.getItem('hide-pagespeedInput') === 'true';
  const isResultHidden = sessionStorage.getItem('hide-pagespeedResult') === 'true';
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('pagespeed');
  const session = sessionStorage.getItem('pageSpeedStep');
  const btns = document.querySelectorAll('.js-float-control');

  const pageSpeedParam = param || session;

  if (param) {
    sessionStorage.setItem('pageSpeedStep', param);
  }

  const idMap = {
    input: 'pagespeedInput',
    result: 'pagespeedResult',
  }

  floatElems.forEach(el => {
    const id = el.id;

    const shouldHide =
      (id === 'pagespeedInput' && isInputHidden) ||
      (id === 'pagespeedResult' && isResultHidden);

    if (!pageSpeedParam || id !== idMap[pageSpeedParam] || shouldHide) {
      el.remove();
    } else {
      el.classList.add('c-lp-pagespeed--is-view');
      el.setAttribute('tabindex', "");
      el.setAttribute('aria-hidden', false);
    }
  })

  btns.forEach(el => {
    el.addEventListener('click', () => {
      const targetId = el.getAttribute('aria-controls');
      const target = document.getElementById(targetId || '');
      if (target) {
        target.classList.remove('c-lp-pagespeed--is-view');
        target.setAttribute('aria-hidden', 'true');
        target.setAttribute('tabindex', '-1');
        sessionStorage.setItem(`hide-${targetId}`, 'true');
      }
    })
  })

  document.addEventListener('DOMContentLoaded', () => {
    pageSpeedReturn()
  })
}
