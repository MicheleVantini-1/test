// MODEL 

// data structure that contains all the employees
employees = {};

/**
* This function works on the employees data structure
* in order to insert or modify the data of an employee
* @param id - the id of the employee
* @param name - the name of the employee
* @param surname - the surname of the employee
* @param level - the level of the employee
* @param salary - the salary of the employee
*/
function insertModifyEmployee(id, name, surname, level, salary)
{
	// the following add an employee to the employees structure
	// only if there is no employees with the specified if
	// otherwise it simply modify its attribute
	employees[id] = { 
						name : name
						, surname : surname 
						, level : level
						, salary : salary
				    };
}


/**
* This function search for the employee with the
* id specified as parameter and returns its information 
* @param id - the id of the employee
* @param name - the name of the employee
* @param surname - the surname of the employee
* @param level - the level of the employee
* @param salary - the salary of the employee
* @return if the exist an employee with the specified if
		  a data structure with all his or her information
		  otherwise an empty structure
*/
function searchEmployee(id)
{
	var params = {};

	var emp = employees[id];

	if(typeof emp !== 'undefined')
	{
		// if exist an employee with the specified id
		// we iterate over its attribute and we add them
		// to the result
		params["id"] = 'value="' + id  + '"';
		for (var property in emp) {
	    	if (emp.hasOwnProperty(property)) {
		        params[property] = 'value="' + emp[property] + '"';
		    }
		}
	}

	return params;
}

/**
* This function delete the employee with the
* id spedified as parameter (if present)
* @param - the id of the employee
*/
function deleteEmployee(id)
{
	// if exist an employee with the specified id
	// we delete it
	if(typeof employees[id] !== 'undefined')
	{
		delete employees[id];
	}
}

// EXPORTS
exports.employees = employees;
exports.insertModifyEmployee = insertModifyEmployee;
exports.searchEmployee = searchEmployee;
exports.deleteEmployee = deleteEmployee;