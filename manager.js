const URL_EMPLOYEE = 'https://sheetdb.io/api/v1/we87ih8npy9df'
  
      $(".btn-view").click(function () {
        displayTable()
      });
      displayTable = () => {
        axios.get(URL_EMPLOYEE)
          .then( response => {
              console.log(response.data);
              $("tbody").html("");
              let temp;
              for (let i = 0; i < response.data.length; i++) {
                temp += `<tr>
                      <th scope="row" class='text-center'>${response.data[i].id}</th>
                      <td class='text-center'>${response.data[i].fullName}</td>
                      <td class='text-center'>${response.data[i].gender}</td>
                      <td class='text-center'>${response.data[i].age}</td>
                      <td class='text-center'>${response.data[i].phone}</td>
                      <td class='text-center'>${response.data[i].address}</td>
                      <td class='text-center'>${response.data[i].role}</td>
                  </tr>`;
              }
              $("tbody").html(`${temp}`);
              
          });
        
      };
      // ADD nhân viên
      $(".btn-save-add").click(function () {
        console.log("a");
        if (
          $("#input-fullName").val() === "" ||
          $("#input-gender").val() === "" ||
          $("#input-age").val() === "" ||
          $("#input-phone").val() === "" ||
          $("#input-address").val() === "" ||
          $("#input-role").val() === "" 
        ) {
          alert("Khong duoc bo trong");
        } else {
          axios.get(URL_EMPLOYEE)
          .then( response => {
            console.log(response.data.id)
            let id = Number(response.data[response.data.length-1].id) + Number(1),
            fullName = $("#input-fullname").val(),
            gender = $("#input-gender").val(),
            age = $("#input-age").val(),
            phone = $("#input-phone").val(),
            address = $("#input-address").val(),
            role = $("#input-role").val()
            axios.post(URL_EMPLOYEE,{
                    "data": {
                      "id": id,
                      "fullName": fullName,
                      "gender": gender,
                      "age": age,
                      "phone": phone,
                      "address": address,
                      "role": role,
                    }
                  }).then( response => {
                    clearInput();
                    $("#form-add").modal("toggle");
                    displayTable()
                  });
          });
          

          // let id = data.length + 1,
          //   fullName = $("#input-fullname").val(),
          //   gender = $("#input-gender").val(),
          //   age = $("#input-age").val(),
          //   phone = $("#input-phone").val(),
          //   address = $("#input-address").val(),
          //   role = $("#input-role").val()
          // data.push({ id, fullName, gender, age, phone, address, role });
          // console.log(data);
          
        }
      });
      clearInput = () => {
        $("#input-fullName").val("");
        $("#input-gender").val("");
        $("#input-age").val("");
        $("#input-phone").val("");
        $("#input-address").val("");
        $("#input-role").val("");
        $("#input-id").val("");
      };
      // Xóa nhân viên
      $(".btn-save-remove").click(function () {
        deleteEmployee()
      });
      deleteEmployee = () => {
        let exist = false;
        let temp;
        console.log("a");
        if ($("#input-id").val() === "") {
          alert("Khong duoc bo trong");
        } else {
          axios.get(URL_EMPLOYEE)
          .then( response => {
              console.log(response.data);
              console.log($("#input-id").val())
              for (let i = 0; i < response.data.length; i++) {
                if ($("#input-id").val() == response.data[i].id) {
                  exist = true;
                  console.log(exist);
                  console.log(i)
                  temp = i;
                }
              }
              if (exist) {
                axios.delete(`${URL_EMPLOYEE}/id/${$("#input-id").val()}`)
                  .then( response => {
                    console.log(response.data);
                    displayTable();
                  });
                clearInput();
                $("#form-remove").modal("toggle");
                
              } else {
                alert("Id khong ton tai");
              }
          });
          
        }
      }