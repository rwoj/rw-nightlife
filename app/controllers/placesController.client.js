'use strict';

(function () {

   var goButton = document.querySelector('#goButton');
   var whereVal = document.querySelector('#whereToGo');
   var list = document.querySelector('.list-group');
   var apiUrl = appUrl + '/api/places';
   var authUrl = appUrl+'/auth/twitter'

   function showPlaces (data) {

     while (list.hasChildNodes()) {
       list.removeChild(list.firstChild);
     }

      var places=JSON.parse(data);
      console.log(places)

      var nrGoing=0;
      var nodeLink, node, textnode1, buttonnode, spannode, numberGoing, textnode2;
      places.forEach(function (x) {
        node = document.createElement("li");
        // node.id=x.id;
        node.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        textnode1 = document.createTextNode(x.name);
        node.appendChild(textnode1);
        buttonnode=document.createElement("button")
        buttonnode.setAttribute("class", "btn");
        spannode=document.createElement("span")
        spannode.setAttribute("class", "badge badge-secondary")
        spannode.id=x.id;
        numberGoing=document.createTextNode(nrGoing)
        spannode.appendChild(numberGoing)
        buttonnode.appendChild(spannode)
        textnode2=document.createTextNode(" Going")
        buttonnode.appendChild(textnode2)
        node.appendChild(buttonnode)
        list.appendChild(node);
        // buttonnode=document.querySelector("#bar"+x.id);
        buttonnode.addEventListener('click', function (e) {
          e.preventDefault();
//          e.target.firstChild.firstChild.data=setGoing(e.target.firstChild.attributes.id)
          console.log("heja:", e.target.firstChild.attributes.id.value);
          window.location=authUrl
//           ajaxFunctions.ajaxRequest('GET', authUrl, function(){
// //            console.log(authdata);
//             console.log("jest")
//           })
        })
      })
   }

   goButton.addEventListener('click', function (event) {
     event.preventDefault()
     var places={
       location:whereVal.value
     };
     console.log(whereVal.value);

     if (places.location){
       ajaxFunctions.ajaxPost('POST', apiUrl, showPlaces, JSON.stringify(places))
     }
   }, false);
})();
