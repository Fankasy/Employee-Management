const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/employees");

const Employee = require("./Employee");

var employee = new Employee();
employee.avatar ="";
employee.name = "James Harden";
employee.title = "CFO";
employee.sex = "Male";
employee.startDate = new Date();
employee.officePhone = "6177843983";
employee.cellPhone = "6177843983";
employee.SMS ="6177843983";
employee.email = "fankasy@hotmail.com";

employee.save(function(err){
    if (err) {
        console.log(err);
    }
    else{
        console.log("user created");
        Employee.find(function(err, employees) {
			if (err) {
				console.log(err);
			}
			else {
				console.log(employees);
			}
		});
    }
});