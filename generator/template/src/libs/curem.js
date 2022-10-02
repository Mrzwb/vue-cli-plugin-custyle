module.exports = (win = window) => {
    const docElem = win.document.documentElement;
    const dpr = win.devicePixelRatio || 1;
    const BASE_FONT_SIZE = 16;
    const DESIGN_WIDTH = 375;

    let setRemUnit = () => {
        const rem = BASE_FONT_SIZE * docElem.clientWidth / DESIGN_WIDTH;  // 
        docElem.style.fontSize = rem + 'px';
    }

    // debounce
    const debounce = (fn, wait) => {
        let timer = null;
        return function() {
            var context = this,
            args = arguments;
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(() => {
                fn.apply(context, args);
              }, wait);
        }
    }

    setRemUnit = debounce(setRemUnit, 100);
    setRemUnit();

    // reset rem unit on page resize @see lib-flexible
    win.addEventListener('resize', setRemUnit)
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit();
        }
    });

    // detect 0.5px supports
    if (dpr >= 2) {
        const fakeBody = win.document.createElement('body')
        const testElement = win.document.createElement('div')
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement)
        docElem.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docElem.classList.add('hairlines')
        }
        docElem.removeChild(fakeBody)
    }

    // scale
    let meta = win.document.querySelector("meta[name='viewport']");
    if (!meta) {
        meta = win.document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        win.document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'width=device-width,initial-scale=1.0');
    meta = null;
}