// ==UserScript==
// @name         HH Harem
// @version      0.2
// @description  Compress the filter and open the upgrade page for girls in a new tab by double-clicking
// @author       -MM-
// @match        https://*.hentaiheroes.com/harem.html
// @match        https://*.hentaiheroes.com/harem/*
// @match        https://nutaku.haremheroes.com/harem.html
// @match        https://nutaku.haremheroes.com/harem/*
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
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.reset-filters-container {width:100%;}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.reset-filters-container button {padding:2px 20px}');
    css.sheet.insertRule('#reset-filters {width:100%;}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper {display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.form-control {width:48%;display:flex;margin-bottom:2px;}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.form-control div.select-group {width:100%}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.form-control[style="margin-bottom: -11px;"] {width:100%;margin-top:5px;}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.form-control[style="margin-bottom: -11px;"] label {display:none}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.form-control button {height:32px !important}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.form-control div.selectric, #filtering_girls div.form-wrapper div.form-control input, #filtering_girls div.form-wrapper div.form-control select {height:32px !important}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.form-control div.selectric span.label {margin-top:-3px;}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.form-control div.shards {margin-top:-7px;}');
    css.sheet.insertRule('#filtering_girls div.form-wrapper div.form-control button.carac-state {margin-top:11px;}');

    //filter layout modifications
    let formControls = document.querySelectorAll('#filtering_girls div.form-wrapper div.form-control');
    let formControlsLast = formControls[formControls.length-1];
    let formControlEvent = document.querySelector('#filtering_girls div.form-wrapper div.form-control select[name="event"]').parentNode.parentNode;
    formControlEvent.innerHTML = '';
    formControlEvent.appendChild(formControlsLast.querySelector('div'));
    formControlEvent.setAttribute('style', 'width:100%;margin-top:5px');
    let formControlWorld = document.querySelector('#filtering_girls div.form-wrapper div.form-control select[name="world"]').parentNode.parentNode;
    formControlWorld.innerHTML = '';
    formControlWorld.appendChild(formControlsLast.querySelector('div'));
    formControlsLast.innerHTML = '';
    formControlsLast.setAttribute('style', 'height:50px');
})();
