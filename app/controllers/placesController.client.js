'use strict';

(function () {

   var goButton = document.querySelector('#goButton');
   var whereVal = document.querySelector('#whereToGo');
   var list = document.querySelector('.list-group');
   var apiUrl = appUrl + '/api/places';
   var apiUrlgo = appUrl + '/api/going'
   var authUrl = appUrl+'/auth/twitter'
   var apiUrlUser = appUrl+'/api/user'
   var places={}

   var userId=null;
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrlUser, function (data) {
        var userObject = JSON.parse(data);
        userId=userObject.id;
        if (userId){
          ajaxFunctions.ajaxRequest('GET', apiUrl, function (loc) {
            var locObject=JSON.parse(loc);
            if(locObject.lastSearch){
              whereVal.value=locObject.lastSearch;
              ajaxFunctions.ajaxPost('POST', apiUrl, showPlaces,
                JSON.stringify({location: locObject.lastSearch}))
            }
          })
        }
      })
    );

   function showPlaces (data) {
     while (list.hasChildNodes()) {
       list.removeChild(list.firstChild);
     }
      var places=JSON.parse(data);
      console.log(places)

      var nrGoing=0;
      var nodeLink, node, textnode1, buttonnode, spannode, numberGoing, textnode2, img, lnk;
      places.forEach(function (x) {
        node = document.createElement("li");
        node.setAttribute("class", "list-group-item d-flex justify-content-between align-items-start");
        // img=document.createElement("img")
        // img.src=x.image_url;
        // img.setAttribute("height", "60")
        // img.setAttribute("width", "60")
        // img.setAttribute("class", "rounded-circle d-inline-flex")
        // node.appendChild(img)
        textnode1 = document.createTextNode(x.name);
        node.appendChild(textnode1);
        buttonnode=document.createElement("button")
        buttonnode.setAttribute("class", "btn");
        spannode=document.createElement("span")
        spannode.setAttribute("class", "badge badge-secondary")
        spannode.id=x.id;
        if (!x.id){console.log("puste id")}
        numberGoing=document.createTextNode(x.going)
        spannode.appendChild(numberGoing)
        buttonnode.appendChild(spannode)
        textnode2=document.createTextNode(" Going")
        buttonnode.appendChild(textnode2)
        node.appendChild(buttonnode)
        list.appendChild(node);
        buttonnode.addEventListener('click', function (e) {
          e.preventDefault();
          if (userId){
            var goObject={placeId:e.target.firstChild.id , userId: userId}
            ajaxFunctions.ajaxPost('POST', apiUrlgo, function (doc) {
              var placeObj=JSON.parse(doc);
              // console.log("doc: ", doc, placeObj.going)
              document.querySelector('#'+e.target.firstChild.id).innerHTML=placeObj.going;
            }, JSON.stringify(goObject))
          } else {
            window.location=authUrl
          }
        })
      })
   }

   goButton.addEventListener('click', function (event) {
     event.preventDefault()
     places.location=whereVal.value;
    //  console.log(whereVal.value);
     if (places.location){
       ajaxFunctions.ajaxPost('POST', apiUrl, showPlaces, JSON.stringify(places))
     }
   }, false);
})();
