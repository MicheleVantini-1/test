// Required libraries
var express = require('express');
var bind = require('bind');
var util = require('util');
var bodyParser = require('body-parser');
var serverConfig = require('./serverConfig.js');
var model = require('./model.js');

var app = express();

// port number used as default 
var port = 8080;
// address used as default
var address = "127.0.0.1";

app.use(bodyParser.urlencoded({extended: true}));    // to support URL-encoded bodies

app.set("port", (process.env.PORT || port));

// with the following we allow the access to static contents
// that are in the script folder but via another name, in this
// case 'scripts'
app.use("/scripts", express.static(__dirname + "/script"));

// accpeting all the post request of the form http://localhost:port/modify
// and setting the proper callback function
app.post("/modify"
	, function (request, response)
	  {
	  	// boolean value that allow to recognize at the end
	  	// of the elaboration if any errors occured
	  	var error = false; 

	  	// variable that stores all the paramters 
	  	// that will be binded to the template
	  	var params = {};
	  	
	  	// if a body is prensent in the request and is not empty
	  	if( typeof request.body !== 'undefined' && request.body)
	    {	
	    	// if a emp_id parameter is prensent in the request
	    	if( typeof request.body.emp_id !== 'undefined')
		    {
		    	var id;
		    	// if the emp_id parameter is empty
		    	if(!request.body.emp_id)
		    	{
		    		// if the id filed is empty we look for the
		    		// maximum id already given to an employee, so this
		    		// value +1 will become the id of the new employee
		    		var max = 0;
		    		for (var property in model.employees) {
				    	if (model.employees.hasOwnProperty(property)) {
					        var val = parseInt(property);
					        if (val > max) 
					        {
					        	max = val;
					        }
					    }
					}

					id = max + 1;
		    	}
		    	else
		    	{
		    		// otherwise we get the integer from the parameter
		    		id = parseInt(request.body.emp_id);
		    		if(isNaN(id))
		    		{
		    			params['idNaN'] = "Id must be an integer number";
		    			params['formVisibility'] = 'style="display:block;"';
		    			error = true;
		    		}
		    	}
		    	
		    	// if no errors occured up to this point
		    	// we get all the parameters in the request
		    	if(!error)
		    	{
		    		var name;
			    	var surname;
			    	var level;
			    	var salary;		    	

			    	// in the followings if else statments we control for each
			    	// parameters if it is present and not empty(and in the case of
			    	// id, level and salary that it is an integer), if it is the case we
			    	// continue with the next parameter, otherwise we return an error that will
				   	// be binded to the template
			    	if( typeof request.body.emp_name !== 'undefined' && request.body.emp_name)
				    {
				    	name = request.body.emp_name;
				    }
				    else
				    {
				    	params['nameEmpty'] = "The name must be not empty";
				    	error = true;
				    }

				    if( typeof request.body.emp_surname !== 'undefined' && request.body.emp_surname)
				    {
				    	surname = request.body.emp_surname;
				    }
				    else
				    {
				    	params['surnameEmpty'] = "The surname must be not empty";
				    	error = true;
				    }

				    if( typeof request.body.emp_lv !== 'undefined' && request.body.emp_lv)
				    {
				    	level = parseInt(request.body.emp_lv);
				    	if(isNaN(level))
				    	{
				    		params['levelNaN'] = "Level must be an integer number";
				    		error = true;
				    	}
				    }	
				    else
				    {
				    	params['levelNaN'] = "Level must be an integer number";
				    	error = true;
				    }

			    	if( typeof request.body.emp_salary !== 'undefined' && request.body.emp_salary)
				    {
				    	salary = parseInt(request.body.emp_salary);
				    	if(isNaN(salary))
				    	{
				    		params['slaryNaN'] = "Salary must be an integer number";
				    		error = true;
				    	}
				    }	
				    else
				    {
				    	params['slaryNaN'] = "Salary must be an integer number";
				    	error = true;
				    }

				    

				    // if all the parameters are present we insert
				    // the employee(if it is a new employee) or we 
				    // modify his or her data
				    if(!error)
				    {
					    model.insertModifyEmployee(id, name, surname, level, salary);
				    }
				    else
				    {
				    	// otherwise we provide an error message that will
				    	// be binded to the template
				    	params['formVisibility'] = 'style="display:block;"';
				    }
		    	}
		    }
		    else
		    {		   
		    	params["problems"] = 'Error: Something has gone wrong with your request'; 	
		    	error = true;
		    }	
	    }

	    // with the results of the operations performed
	    // we fill the template and we return it to the user
	    bind.toFile(
			'tpl/index.tpl'
			, params
			, function (data)
			  {				
				response.writeHead(200, serverConfig.headers);
				response.end(data);
			  }
		);
	  	
	  }
);

// accpeting all the post request of the form http://localhost:port/search
// and setting the proper callback function
app.post("/search"
	, function (request, response)
	  {
	  	// boolean value that allow to recognize at the end
	  	// of the elaboration if any errors occured
	  	var error = false; 

	  	// variable that stores all the paramters 
	  	// that will be binded to the template
	  	var params = {};
	  	
	  	// if a body is prensent in the request and is not empty
	  	if( typeof request.body !== 'undefined' && request.body)
	    {	
	    	// if the employee_search parameter is present
		    // we look into the data structure that stores 
		    // all the emplyess for the employee with the 
		    // specified id and if he or she is present we 
		    // return his or her data
		    if( typeof request.body.employee_search !== 'undefined' && request.body.employee_search)
		    {
		    	var search;
		    	var isSearch;

		    	search = request.body.employee_search;
		    	// if the isSearch paramter is present, if it is true 
		    	// we then proceed with the search operation, otherwise
		    	// we procees with the delete operation
		    	if( typeof request.body.isSearch !== 'undefined' && request.body.isSearch)
			    {
			    	isSearch = request.body.isSearch;

			    	// at first we check if the id is really an integer
		    		var id = parseInt(search);
			    	if(isNaN(id))
			    	{
			    		// if it is not the case we return an error
			    		params['searchNaN'] = "What you typed is not a valid id";
			    		error = true;
			    	}

			    	if(!error)
			    	{
			    		if(isSearch === "true")
				    	{
				    		// search for the employee with the specified id;
			    			// if there is no employee with the specifed id,
			    			// then params will be empty after this call
			    			params = model.searchEmployee(id);
			    			if(typeof params["id"] === 'undefined')
			    			{
			    				params["search"] = 'value="' + id + '"';	
			    				params["newEmpSearched"] = '<br/>There is no emp with the specified id,<br/>anyway you can create a new one with that id';	
			    			}
				    		params["formVisibility"] = 'style="display:block;"';	    		

				    	}
				    	else if (isSearch === "false")
				    	{
				    		// delete the employee with the specified
				    		// if (if present)
				    		model.deleteEmployee(id);
			    			params["formVisibility"] = 'style="display:none;"';
				    	}
				    	else
				    	{
				    		params["problems"] = 'Error: Something has gone wrong with your request';
				    		error = true;
				    	}	
			    	}
			    }
			    else
			    {
			    	params["problems"] = 'Error: Something has gone wrong with your request';
			    	error = true;
			    }
		    }
		    else
		    {		   
		    	params["problems"] = 'Error: Something has gone wrong with your request';
		    	error = true;
		    }	
	    }

	    // with the results of the operations performed
	    // we fill the template and we return it to the user
	    bind.toFile(
			'tpl/index.tpl'
			, params
			, function (data)
			  {				
				response.writeHead(200, serverConfig.headers);
				response.end(data);
			  }
		);
	  	
	  }
);

// accpeting all the get request of the form http://localhost:port/
// and setting the proper callback function
app.get("/"
	, function (request, response)
	  {
	  	// in this case we produce an html document from
	  	// a template but we leave all the parameters empty
	  	// because the user is requesting the home page
	    bind.toFile(
			'tpl/index.tpl'
			, {}
			, function (data)
			  {				
				response.writeHead(200, serverConfig.headers);
				response.end(data);
			  }
		);
	  	
	  }
);

app.listen(app.get('port'), address);
console.log("Server running at http://" + address + ":" + port)