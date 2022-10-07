// ==UserScript==
// @name         HH Harem
// @version      0.7
// @description  Compress the filter and open the upgrade page for girls in a new tab by double-clicking
// @author       -MM-
// @match        https://*.hentaiheroes.com/harem.html
// @match        https://*.hentaiheroes.com/harem/*
// @match        https://nutaku.haremheroes.com/harem.html
// @match        https://nutaku.haremheroes.com/harem/*
// @match        https://*.comixharem.com/harem.html
// @match        https://*.comixharem.com/harem/*
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
    let formControlsPN = formControlsLast.parentNode;
    let formControlShards = document.createElement('div');
    formControlShards.setAttribute('class', 'form-control');
    formControlShards.appendChild(formControlsLast.querySelector('div'));
    formControlShards.setAttribute('style', 'width:100%;margin-top:5px');
    formControlsPN.insertBefore(formControlShards, formControlsLast);
    let formControlCarac = document.createElement('div');
    formControlCarac.setAttribute('class', 'form-control');
    formControlCarac.appendChild(formControlsLast.querySelector('div'));
    formControlsPN.insertBefore(formControlCarac, formControlShards);
    formControlsLast.innerHTML = '';
    formControlsLast.setAttribute('style', 'height:50px');

    //temporarily deactivated until i have some time for it
    document.querySelector('#filtering_girls div.form-wrapper div.form-control select[name="event"]').parentNode.parentNode.setAttribute('style', 'display:none');
    document.querySelector('#filtering_girls div.form-wrapper div.form-control select[name="world"]').parentNode.parentNode.setAttribute('style', 'display:none');

    //filter status
    let filterStatus = localStorage.getItem('HHHarem_FilterStatus');
    if(filterStatus == null) filterStatus = 'Closed';
    let formControlFilterStatus = document.createElement('div');
    formControlFilterStatus.setAttribute('class', 'form-control');
    formControlFilterStatus.setAttribute('style', 'width:100%;height:50px');
    formControlFilterStatus.innerHTML = '<div class="select-group"><label class="head-group" for="lists-select">Filter Status</label><select icon="down-arrow" onchange="localStorage.setItem(\'HHHarem_FilterStatus\', this.value)"><option value="Open"' + (filterStatus == 'Open' ? ' selected="selected"' : '') + '>Open by default</option><option value="Closed"' + (filterStatus == 'Closed' ? ' selected="selected"' : '') + '>Closed by default</option></select></div>';
    formControlsPN.insertBefore(formControlFilterStatus, formControlsLast);

    //open the filter if necessary
    if(filterStatus == 'Open')
    {
        document.getElementById('filtering_girls').setAttribute('class', 'original_position');
        document.getElementById('harem_left').setAttribute('class', 'original_position');
        document.getElementById('harem_right').setAttribute('class', 'original_position');
        document.querySelector('#filter_girls span').setAttribute('class', 'search_close_icn');
    }
})();
