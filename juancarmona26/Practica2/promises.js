'use strict';

const table = document.getElementById("userTable");
const modal = document.getElementById('myModal');
const modalText = document.getElementById('modalText');
const span = document.getElementsByClassName("close")[0];


const url = 'https://randomuser.me/api/';

const getRandomUsers = () => {
    fetch(url)
    .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            modalText.innerHTML = "Error al realizar la petición, CODE ERROR: " + response.status;
                modal.style.display = "block";
          return;
        }

        response.json().then( (data) => {
            console.log(JSON.stringify(data));
            callPromiseToFillTable(data)
            .then(user => {
                console.log('ya jalo: ' + user);
                for(const i in user.results){
                    console.log("valores: " + user.results[i].gender);
                    const userData = [ user.results[i].name.first , 
                                    user.results[i].name.last, 
                                    user.results[i].gender];
                    console.log(userData);
                    const row = table.insertRow(i);
                   
                        const cell1 = row.insertCell(0);
                        const cell2 = row.insertCell(1);
                        const cell3 = row.insertCell(2);

                        cell1.innerHTML = user.results[i].name.first;
                        cell2.innerHTML = user.results[i].name.last;
                        cell3.innerHTML = user.results[i].gender;
                   
                }
            })
            .catch(error => {
                console.log('Rejected');
                modalText.innerHTML = "Error al procesar los datos."
                modal.style.display = "block";
            });
        });
      }
    ).catch(error => {
      console.log('Fetch Error :-S', error);
      modalText.innerHTML = "Error al realizar la petici&oacute;n, ERROR: " +error;
      modal.style.display = "block";
    });
            
}

const callPromiseToFillTable = (user) => {

    return new Promise((resolve, reject) => {
        console.log('initpromise: ' + user);
        if(user !== null ) {
            resolve(user);
        } else {
            reject(new Error);
        }
    });
   
};

const closeModal = () => {
    modal.style.display = "none";
}

span.onclick = () => {
    modal.style.display = "none";
};



window.onload = () => {
    getRandomUsers();
};



