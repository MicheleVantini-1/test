<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Employees</title>
	</head>
	<body>
		<h2> Employees manager </h2>
		<label>ID:</label><input type="numeric" name="employee_search" id="employee_search" (: search ~ :)/> <b id="searchNaN"> (: searchNaN ~ :) </b>
		<button onclick="search(true);">Search</button>
		<button onclick="search(false);">Delete</button>
		<b> (: problems ~ :) </b>
		<b id="newEmpSearched"> (: newEmpSearched ~ :) </b>
		<br/><br/>
		<button onclick="showHideEmployeeForm();" >Show/Hide new emplyee form</button>
		<br/>
		<br/>
		<form action="http://localhost:8080/modify" method='POST' id="insertModifyForm" (: formVisibility ~ style="display:none;" :) >
			<label>ID:</label>
			<input type="numeric" name="emp_id" id="emp_id" (: id ~ :) /> <b id="idNaN"> (: idNaN ~ :) </b>
			<br/>
			<label>Name:</label><input type="text" name="emp_name" id="emp_name" (: name ~ :)/> <b id="nameEmpty"> (: nameEmpty ~ :) </b>
			<br/>
			<label>Surname:</label><input type="text" name="emp_surname" id="emp_surname" (: surname ~ :)/> <b id="surnameEmpty"> (: surnameEmpty ~ :) </b>
			<br/>
			<label>Level:</label><input type="numeric" name="emp_lv" id="emp_lv" (: level ~ :)/> <b id="levelNaN"> (: levelNaN ~ :) </b>
			<br/>
			<label>Salary:</label><input type="numeric" name="emp_salary" id="emp_salary" (: salary ~ :)/> <b id="salaryNaN"> (: salaryNaN ~ :) </b>
			<br/><br/>
			<b>  (: errorMsg ~ :) <b><br/>
			<button type="button" onclick="insertModifySubmit();">Insert/Modify</button>
		</form>

		<script src="scripts/script.js"></script>
	</body>
</html>