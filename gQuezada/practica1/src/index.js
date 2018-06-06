(() => {
   (async () => {
      let rawResponse = await fetch('https://randomuser.me/api/', {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         }
      });
      let content = await rawResponse.json();

      let employees = [];

      content.results.forEach((element) ()=> {
         let e = new Employee(element.name.first,
            element.email, element.phone, element.cell,
            element.login.sha256);
         employees.push(e);
      });


      for (let employee of employees) {
         document.querySelector('#employees tbody').appendChild(employee.getHTML());
      }

   })();
})();
