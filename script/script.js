/**
* This function creates a form with the information
* provided by the user in the search field, but this
* function allows to distinguish between search 
* actions and delete actions
+ @param searchBool true in case of search; false in case of delete
*/
function search(searchBool) {

    var emp_search = document.getElementById("employee_search").value;
    // at first we have to check the form input
    if (emp_search == "" || isNaN(parseInt(emp_search)))
    {
        // if the field is empty or is not a number we return an error
        document.getElementById("searchNaN").innerHTML = "Id must be an integer number";
        document.getElementById("newEmpSearched").innerHTML = "";
        document.getElementById("insertModifyForm").style.display = "none";        
    }
    else
    {
        /*var http = new XMLHttpRequest();
        var url = "/search";
        var params = "employee_search=" + document.getElementById("employee_search").value 
                     + "&" 
                     + "isSearch=" + searchBool;
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = function() { //Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                (http.responseText);
            }
        }
        http.send(params);*/

        
        // if everything is ok with the input we submit the form
        var form = document.createElement("form");
    
        var search = document.createElement("input"); 
        search.type = "text";
        search.value = document.getElementById("employee_search").value;
        search.name = "employee_search";
        search.id = "employee_search";
        
        var isSearch = document.createElement("input");  
        isSearch.type = "text";
        isSearch.value = searchBool;
        isSearch.name = "isSearch";
        isSearch.id = "isSearch";
        
        form.appendChild(search);  
        form.appendChild(isSearch);

        form.method = "POST";
        form.action = "http://localhost:8080/search"; 
        form.submit();
    }
}

/**
* This function does all the necessary checks
* on all the field of the insert/modify form
* and if everything is ok submits the form, otherwise
* shows all the required error messages
*/
function insertModifySubmit()
{
    // we have to check each value of the input fields

    var id = document.getElementById("emp_id").value;
    var name = document.getElementById("emp_name").value;
    var surname = document.getElementById("emp_surname").value;
    var level = document.getElementById("emp_lv").value;
    var salary = document.getElementById("emp_salary").value;

    var error = false;
    
    if (id == "" || isNaN(parseInt(id)))
    {
        // if the id field is empty or is not a number we return an error
        document.getElementById("idNaN").innerHTML = "Id must be an integer number";
        error = true;
    }
    else
    {
        document.getElementById("idNaN").innerHTML = "";
    }
    
    if (name == "")
    {
        // if the name field is empty we return an error
        document.getElementById("nameEmpty").innerHTML = "The name must be not empty";
        error = true;
    }
    else
    {
        document.getElementById("nameEmpty").innerHTML = "";
    }
    
    if (surname == "")
    {
        // if the surname field is empty we return an error
        document.getElementById("surnameEmpty").innerHTML = "The surname must be not empty";
        error = true;
    }
    else
    {
        document.getElementById("surnameEmpty").innerHTML = "";
    }
    
    if (level == "" || isNaN(parseInt(level)))
    {
        // if the level field is empty or is not a number we return an error
        document.getElementById("levelNaN").innerHTML = "Level must be an integer number";
        error = true;
    }
    else
    {
        document.getElementById("levelNaN").innerHTML = "";
    }
    
    if (salary == "" || isNaN(parseInt(salary)))
    {
        // if the salary field is empty or is not a number we return an error
        document.getElementById("salaryNaN").innerHTML = "Salary must be an integer number";
        error = true;
    }
    else
    {
        document.getElementById("salaryNaN").innerHTML = "";
    }

    // if everything is ok we submit the form
    if(!error)
    {
        document.getElementById("insertModifyForm").submit();
    }
}

/**
* This function controls the visibility of the
* insert/modify form 
*/
function showHideEmployeeForm()
{
    if(document.getElementById("insertModifyForm").style.display == "none")
    {
        document.getElementById("insertModifyForm").style.display = "block";
    }
    else
    {
        document.getElementById("insertModifyForm").style.display = "none";        
    }
}
