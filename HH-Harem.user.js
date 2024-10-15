// ==UserScript==
// @name         HH Harem
// @version      0.17
// @description  Compact Harem filter, "open by default" setting, open the girl upgrade page in a new tab by double-clicking
// @author       -MM-
// @match        https://*.hentaiheroes.com/characters.html*
// @match        https://*.hentaiheroes.com/characters/*
// @match        https://*.hentaiheroes.com/girl/*?resource=experience*
// @match        https://nutaku.haremheroes.com/characters.html*
// @match        https://nutaku.haremheroes.com/characters/*
// @match        https://nutaku.haremheroes.com/girl/*?resource=experience*
// @match        https://*.comixharem.com/characters.html
// @match        https://*.comixharem.com/characters/*
// @match        https://*.comixharem.com/girl/*?resource=experience*
// @match        https://*.pornstarharem.com/characters.html*
// @match        https://*.pornstarharem.com/characters/*
// @match        https://*.pornstarharem.com/girl/*?resource=experience*
// @match        https://*.gayharem.com/characters.html*
// @match        https://*.gayharem.com/characters/*
// @match        https://*.gayharem.com/girl/*?resource=experience*
// @match        https://*.gaypornstarharem.com/characters.html*
// @match        https://*.gaypornstarharem.com/characters/*
// @match        https://*.gaypornstarharem.com/girl/*?resource=experience*
// @match        https://*.transpornstarharem.com/characters.html*
// @match        https://*.transpornstarharem.com/characters/*
// @match        https://*.transpornstarharem.com/girl/*?resource=experience*
// @match        https://*.hornyheroes.com/characters.html*
// @match        https://*.hornyheroes.com/characters/*
// @match        https://*.hornyheroes.com/girl/*?resource=experience*
// @run-at       document-end
// @namespace    https://github.com/HH-GAME-MM/HH-Harem
// @updateURL    https://github.com/HH-GAME-MM/HH-Harem/raw/main/HH-Harem.user.js
// @downloadURL  https://github.com/HH-GAME-MM/HH-Harem/raw/main/HH-Harem.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hentaiheroes.com
// @grant        GM_info
// @grant        unsafeWindow
// ==/UserScript==

(function(window) {
    'use strict';

    console.log('HH Harem Script v' + GM_info.script.version);

    //shared game functions and objects
    const getSessionId = (window.getSessionId ? window.getSessionId : () => { return new URLSearchParams(window.location.search).get("sess"); }); //Nutaku only

    //remove nutaku's message
    const alert = window.alert;
    function noIDont(message) {
        if (message == "You need to be inside Nutaku's frame for this to work.") { return; }
        alert(message);
    }
    window.alert = noIDont;

    setTimeout(run, 1);
    function run(tries = 0)
    {
        //double click a girl to open girl upgrade page in a new tab
        let girls_list = document.querySelector('#harem_left div.girls_list');
        if(!girls_list)
        {
            if(tries < 50) {
                setTimeout(run, 100, tries + 1);
            }
            return;
        }
        girls_list.addEventListener('dblclick', (e) => {
            let target = e.target;
            if(target != girls_list)
            {
                while(target.getAttribute('id_girl') == null) target = target.parentNode;
                const nutakuSessionId = getSessionId(); // on nutaku the session id is required
                window.open('https://' + window.location.hostname + '/girl/' + target.getAttribute('id_girl') + '?resource=experience' + (nutakuSessionId !== null ? '&sess=' + nutakuSessionId : ''), '_blank');
            }
        });

        //filter css
        let css = document.createElement('style');
        document.head.appendChild(css);
        css.sheet.insertRule('#filtering_girls .form-wrapper .form-control .checkbox-group .check-btn.shards-state div {margin-top:-2px !important}');
        css.sheet.insertRule('#filtering_girls .form-wrapper .form-control .checkbox-group .check-btn.shards-state, #filtering_girls .form-wrapper .form-control .checkbox-group .check-btn.carac-state {height:1.7rem !important;}');
        css.sheet.insertRule('#filtering_girls .form-wrapper .checkbox-group:nth-of-type(2) {margin-bottom:0px !important}');
        css.sheet.insertRule('#filtering_girls .form-wrapper .form-control.filter-by-checkbox {margin-top:5px !important}');

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
    }
})(unsafeWindow);
