(function () {
    const G = window || this;
    const d = document;
    const even = G.BLOG.even;
    // const $ = G.BLOG.$;
    const $ = d.querySelector.bind(d);
    const searchIco = $('#search');
    const searchWrap = $('#search-wrap');
    const keyInput = $('#key');
    const back = $('#back');
    const searchPanel = $('#search-panel');
    const searchResult = $('#search-result');
    const searchTpl = $('#search-tpl').innerHTML;
    const JSON_DATA = (`${G.BLOG.ROOT}/content.json`).replace(/\/{2}/g, '/');
    let searchData;

    function loadData(success) {

        if (!searchData) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', JSON_DATA, true);

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    const res = JSON.parse(this.response);
                    searchData = res instanceof Array ? res : res.posts;
                    success(searchData);
                } else {
                    console.error(this.statusText);
                }
            };

            xhr.onerror = function () {
                console.error(this.statusText);
            };

            xhr.send();

        } else {
            success(searchData);
        }
    }

    function tpl(html, data) {
        return html.replace(/\{\w+\}/g, str => {
            const prop = str.replace(/\{|\}/g, '');
            return data[prop] || '';
        });
    }

    const noop = G.BLOG.noop;
    const root = $('html');

    const Control = {
        show() {
            G.innerWidth < 760 ? root.classList.add('lock-size') : noop;
            searchPanel.classList.add('in');
        },
        hide() {
            G.innerWidth < 760 ? root.classList.remove('lock-size') : noop;
            searchPanel.classList.remove('in');
        }
    };

    function render(data) {
        let html = '';
        if (data.length) {

            html = data.map(post => tpl(searchTpl, {
                title: post.title,
                path: (`${G.BLOG.ROOT}/${post.path}`).replace(/\/{2,}/g, '/'),
                date: new Date(post.date).toLocaleDateString(),
                tags: post.tags.map(tag => `<span>#${tag.name}</span>`).join('')
            })).join('');

        } else {
            html = '<li class="tips"><i class="icon icon-coffee icon-3x"></i><p>Results not found!</p></li>';
        }

        searchResult.innerHTML = html;
    }

    function regtest(raw, regExp) {
        regExp.lastIndex = 0;
        return regExp.test(raw);
    }

    function matcher(post, regExp) {
        return regtest(post.title, regExp) || post.tags.some(tag => regtest(tag.name, regExp)) || regtest(post.text, regExp);
    }

    function search(e) {
        const key = this.value.trim();
        if (!key) {
            return;
        }

        const regExp = new RegExp(key.replace(/[ ]/g, '|'), 'gmi');

        loadData(data => {

            const result = data.filter(post => matcher(post, regExp));

            render(result);
            Control.show();
        });

        e.preventDefault();
    }


    searchIco.addEventListener(even, () => {
        searchWrap.classList.toggle('in');
        keyInput.value = '';
        searchWrap.classList.contains('in') ? keyInput.focus() : keyInput.blur();
    });

    back.addEventListener(even, () => {
        searchWrap.classList.remove('in');
        Control.hide();
    });

    document.addEventListener(even, e => {
        if (e.target.id !== 'key' && even === 'click') {
            Control.hide();
        }
    });

    keyInput.addEventListener('input', search);
    keyInput.addEventListener(even, search);
}).call(this);
