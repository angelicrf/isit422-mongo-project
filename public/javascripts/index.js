
function Users(pname, pLastName, pRankNum) {
    this.name= pname;
    this.lastname = pLastName;
    this.ranknum = pRankNum;
    this.completed = false;
  }
  var ClientUsers = [];  
document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("submit").addEventListener("click", function () {
        var tname = document.getElementById("name").value;
        var tLastName = document.getElementById("lastname").value;
        var tRankNum = document.getElementById("ranknum").value;
        var oneUsers = new Users(tname, tLastName, tRankNum);

         const request = new Request('CreateUsers', {
            method: 'POST',
            body: JSON.stringify(oneUsers),
            headers: new Headers({
                'Content-Type': 'application/json'
                })
            });
        fetch(request)                                
            .then(resPromise1 => resPromise1.json())   
            .then(data =>   console.log("added new note" ), 
                document.getElementById("name").value = "",
                document.getElementById("lastname").value= "",
                document.getElementById("ranknum").value= ""
            )          
            .catch(function (err) {
                console.log(err);
            });

    }); 
    document.getElementById("get").addEventListener("click", function () {
        
        var ul = document.getElementById('listUl');
        ul.innerHTML = "";

        fetch('/GetUsers')
        .then(function (response) { 
            return response.json();  
        })
        .then(function (data) { 

            ClientNotes = data;  
            ClientNotes.sort(compare); 
            console.log(data);
            ClientNotes.forEach(ProcessOneToDo);
            function ProcessOneToDo(item, index) {
                var li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML=li.innerHTML + index + ": " + " RankNum: " + item.ranknum + "  " + item.name + ":  " + item.lastname + " Done? "+ item.completed;
            }
        });
        function compare(a,b) {
            if (a.completed == false && b.completed== true) {
                return -1;
            }
            if (a.completed == false && b.completed== true) {
                return 1;
            }
            return 0;
        }
    });

    document.getElementById("delete").addEventListener("click", function () {

        var whichToDo = document.getElementById('deletename').value;
        var idToDelete = "";
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].name === whichToDo) {
                idToDelete = ClientNotes[i]._id;
           }
        }      
        
        if(idToDelete != "") 
        {
            fetch( "/DeleteUsers/" + idToDelete , {
                method: "DELETE"
            })
            .then(resp => document.getElementById('deletename').value = "") 
            .catch(function (err) { 
                console.log(err);
            });     
        }
        else { 
            console.log("no name is matched");
        } 
    });
    document.getElementById("completed").addEventListener("click", function () {
        
        var whichToDo = document.getElementById('completed name').value;
        var itemToChange = null;
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].name === whichToDo) {
                itemToChange = ClientNotes[i]
                console.log(itemToChange);
           }
        }  
        if(itemToChange != null)
        {
            const request = new Request('UserApprouved', {
                method: 'PUT',
                body: JSON.stringify(itemToChange),
                headers: new Headers({
                    'Content-Type': 'application/json'
                    })
                });
            fetch(request)                                
                .then(resPromise1 => resPromise1.json())             
                .then(data =>   console.log("user has been approuved" ),  
                )          
                .catch(function (err) {
                    console.log(err);
                });
        }
        else {
            console.log("no name is matched");
        } 
    }); 
});

