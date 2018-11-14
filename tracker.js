// ==UserScript==
// @name         tesco-practice
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.example.com/groceries/en-GB/
// @include       /groceries\/en-GB/
// @grant        none
// ==/UserScript==

(function(exports) {
    'use strict';
    var count = {}
    var navElements = document.querySelectorAll('.nav-item__link, .menu__link menu__link--aisle');
    var request = {
        url: 'https://examplesite.co.uk',
        type: 'POST'
    }

    for ( var i=0; i < navElements.length; i++){
       navElements[i].addEventListener('click', function(event){
           apiRequest(event, request, updateCounter)
           // updateCounter(event);
       });
    };

    function apiRequest(event, requestInfo, callback){

        var request = new XMLHttpRequest();
        var d = {
            ln: event.target.href,
            pn: event.target.innerText,
           };

        var url = requestInfo.type === 'POST' ? requestInfo.url : requestInfo.url + '?' + d.ln + '=' + d.pn;

        request.onreadystatechange = function(){
                if (request.readyState == 4){
                    callback(d.ln)
                };
        };
        request.open(requestInfo.type, url, true);
        if(requestInfo.type === 'POST'){
            request.setRequestHeader('Content-type', 'application/json');
            JSON.stringify(d);
            request.send(d);
        }else if(requestInfo.type === 'GET'){
           request.send(null);
        }

    }

    // function updateCounter(event){
    //    if(sessionStorage.getItem(event.target.href)){
    //          incrementCounter(event.target.href)
     //   }else{
     //         sessionStorage.setItem(event.target.href, 1);
      //  };
    // };

    function updateCounter(link){
        count[link] == null ? (count[link] = 1) : (count[link] += 1);
        sessionStorage.setItem('counter', JSON.stringify(count));
        updateDisplay(divElement);
    };

    // function incrementCounter(item){
    //    var currentValue = getCount(item);
    //    sessionStorage[item] = currentValue + 1;
    // }

    // function getCount(item){
    //    return parseInt(sessionStorage[item])
    // };

    function updateDisplay(divElement){
        divElement.innerHTML = counterText();
    }

    function displayCounter(divElement){
       /* divElement.style.border = '1px solid #888'
        divElement.style.margin = '5px auto'
        divElement.style.padding = '10px'
        divElement.style.width = '60%'
        divElement.style.height = '80%'
        divElement.style.backgroundColor = "white"; */

        document.body.insertBefore(divElement, null);
        var styles = "#widget{position:fixed!important;\
                       z-index :9999;\
                       top:10px;right:5%;\
                       width : 30%;\
                       height:20%;\
                       padding:10px;\
                       margin : 5% auto;\
                       border-radius : 10px;\
                       background: black;\
                       color:#00ff00;\
                       overflow: auto;\
                       border: 1px solid #888;\
                       box-shadow: 10px 10px 5px grey;\
                       opacity: 0.8}";
        var stls = document.createElement("style");
        stls.textContent = styles;
        document.head.appendChild(stls);
    };

    function counterText(){
     var links = JSON.parse(sessionStorage.getItem('counter'))
     var arr = ['<h4>Things you clicked:</h4>'];
     for(var i=0; i<Object.keys(links).length; i++){
         var str = ''
         str = '<p>' + Object.keys(links)[i] + ' : ' + links[Object.keys(links)[i]] + '</p>';
         arr.push(str);
        };
     return arr.join("")
    };

    var divElement = document.createElement('div')
    divElement.id = 'widget'
    displayCounter(divElement)

    exports.displayCounter = displayCounter

 })(this)








