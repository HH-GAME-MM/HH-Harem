// ==UserScript==
// @name         HH Harem
// @version      0.12
// @description  Compact Harem filter, "open by default" setting, open the girl upgrade page in a new tab by double-clicking
// @author       -MM-
// @match        https://*.hentaiheroes.com/harem.html
// @match        https://*.hentaiheroes.com/harem/*
// @match        https://nutaku.haremheroes.com/harem.html
// @match        https://nutaku.haremheroes.com/harem/*
// @match        https://www.comixharem.com/harem.html
// @match        https://www.comixharem.com/harem/*
// @match        https://www.pornstarharem.com/harem.html
// @match        https://www.pornstarharem.com/harem/*
// @run-at       document-end
// @namespace    https://github.com/HH-GAME-MM/HH-Harem
// @updateURL    https://github.com/HH-GAME-MM/HH-Harem/raw/main/HH-Harem.user.js
// @downloadURL  https://github.com/HH-GAME-MM/HH-Harem/raw/main/HH-Harem.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hentaiheroes.com
// @grant        GM_info
// ==/UserScript==

(function() {
    'use strict';

    console.log('HH Harem Script v' + GM_info.script.version);

    setTimeout(() => {
        //double click a girl to open girl upgrade page in a new tab
        let girls_list = document.querySelector('#harem_left div.girls_list');
        girls_list.addEventListener('dblclick', (e) => {
            let target = e.target;
            if(target != girls_list)
            {
                while(target.getAttribute('id_girl') == null) target = target.parentNode;
                window.open('https://'+window.location.hostname+'/girl/'+target.getAttribute('id_girl')+'?resource=experience', '_blank');
            }
        });

        //filter css
        let css = document.createElement('style');
        document.head.appendChild(css);
        css.sheet.insertRule('#filtering_girls .form-wrapper .form-control .checkbox-group .check-btn.shards-state div {margin-top:-2px !important}');
        css.sheet.insertRule('#filtering_girls .form-wrapper .form-control .checkbox-group .check-btn.shards-state, #filtering_girls .form-wrapper .form-control .checkbox-group .check-btn.carac-state {height:1.7rem !important;}');
        css.sheet.insertRule('#filtering_girls .form-wrapper .checkbox-group:nth-of-type(2) {margin-bottom:0px !important}');

        //filter status
        let filterStatus = localStorage.getItem('HHHarem_FilterStatus');
        if(filterStatus == null) filterStatus = 'Closed';
        let formControlFilterStatus = document.createElement('div');
        formControlFilterStatus.setAttribute('class', 'form-control');
        formControlFilterStatus.setAttribute('style', 'grid-column:1/3;width:21rem;max-width:21rem;margin-bottom:5px');
        formControlFilterStatus.innerHTML = '<div class="select-group"><label class="head-group" for="lists-select">Filter Status</label><select icon="down-arrow" onchange="localStorage.setItem(\'HHHarem_FilterStatus\', this.value)"><option value="Open"' + (filterStatus == 'Open' ? ' selected="selected"' : '') + '>Open by default</option><option value="Closed"' + (filterStatus == 'Closed' ? ' selected="selected"' : '') + '>Closed by default</option></select></div>';
        document.querySelector('#filtering_girls div.form-wrapper').appendChild(formControlFilterStatus);

        //open the filter if necessary
        if(filterStatus == 'Open')
        {
            document.getElementById('filtering_girls').setAttribute('class', 'original_position');
            document.getElementById('harem_left').setAttribute('class', 'original_position');
            document.getElementById('harem_right').setAttribute('class', 'original_position');
            document.querySelector('#filter_girls span').setAttribute('class', 'search_close_icn');
        }
    }, 1);
})();
