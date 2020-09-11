let email = document.getElementById('email');
let city = document.getElementById('city');

function check_Zip(){
    let zipCode = document.getElementById('zipcod');
    let regex = /^[0-9]/;
   
    if(regex.test(zipCode) == false){
    alert("test1");
    return false;
    }
    if(zipCode == " "){
    alert("test 2");
    return false;
    }
    return true;
}
