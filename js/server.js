////dependencies
const connection = require(`./js/connection.js`);
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const validate = require('./js/validate.js');
const express = require('express');

////declarations
const app = express();
const PORT = 3001;

//use express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection.connect((error) => {
	if (error) throw error;
	promptUser();
});

let asciiArt =
	`                                                                                                                                                         
                                                                                                                                                           
                                                                                                                                                           
EEEEEEEEEEEEEEEEEEEEEE                                            lllllll                                                                                  
E::::::::::::::::::::E                                            l:::::l                                                                                  
E::::::::::::::::::::E                                            l:::::l                                                                                  
EE::::::EEEEEEEEE::::E                                            l:::::l                                                                                  
  E:::::E       EEEEEE   mmmmmmm    mmmmmmm   ppppp   ppppppppp    l::::l    ooooooooooo yyyyyyy           yyyyyyy eeeeeeeeeeee       eeeeeeeeeeee         
  E:::::E              mm:::::::m  m:::::::mm p::::ppp:::::::::p   l::::l  oo:::::::::::ooy:::::y         y:::::yee::::::::::::ee   ee::::::::::::ee       
  E::::::EEEEEEEEEE   m::::::::::mm::::::::::mp:::::::::::::::::p  l::::l o:::::::::::::::oy:::::y       y:::::ye::::::eeeee:::::eee::::::eeeee:::::ee     
  E:::::::::::::::E   m::::::::::::::::::::::mpp::::::ppppp::::::p l::::l o:::::ooooo:::::o y:::::y     y:::::ye::::::e     e:::::e::::::e     e:::::e     
  E:::::::::::::::E   m:::::mmm::::::mmm:::::m p:::::p     p:::::p l::::l o::::o     o::::o  y:::::y   y:::::y e:::::::eeeee::::::e:::::::eeeee::::::e     
  E::::::EEEEEEEEEE   m::::m   m::::m   m::::m p:::::p     p:::::p l::::l o::::o     o::::o   y:::::y y:::::y  e:::::::::::::::::ee:::::::::::::::::e      
  E:::::E             m::::m   m::::m   m::::m p:::::p     p:::::p l::::l o::::o     o::::o    y:::::y:::::y   e::::::eeeeeeeeeee e::::::eeeeeeeeeee       
  E:::::E       EEEEEEm::::m   m::::m   m::::m p:::::p    p::::::p l::::l o::::o     o::::o     y:::::::::y    e:::::::e          e:::::::e                
EE::::::EEEEEEEE:::::Em::::m   m::::m   m::::m p:::::ppppp:::::::pl::::::lo:::::ooooo:::::o      y:::::::y     e::::::::e         e::::::::e               
E::::::::::::::::::::Em::::m   m::::m   m::::m p::::::::::::::::p l::::::lo:::::::::::::::o       y:::::y       e::::::::eeeeeeee  e::::::::eeeeeeee       
E::::::::::::::::::::Em::::m   m::::m   m::::m p::::::::::::::pp  l::::::l oo:::::::::::oo       y:::::y         ee:::::::::::::e   ee:::::::::::::e       
EEEEEEEEEEEEEEEEEEEEEEmmmmmm   mmmmmm   mmmmmm p::::::pppppppp    llllllll   ooooooooooo        y:::::y            eeeeeeeeeeeeee     eeeeeeeeeeeeee       
                                               p:::::p                                         y:::::y                                                     
                                               p:::::p                                        y:::::y                                                      
                                              p:::::::p                                      y:::::y                                                       
                                              p:::::::p                                     y:::::y                                                        
                                              p:::::::p                                    yyyyyyy                                                         
                                              ppppppppp                                                                                                    
                                                                                                                                                           
                                                                                                                                                           
                                                                                                                                                           
MMMMMMMM               MMMMMMMM                                                                                                                            
M:::::::M             M:::::::M                                                                                                                            
M::::::::M           M::::::::M                                                                                                                            
M:::::::::M         M:::::::::M                                                                                                                            
M::::::::::M       M::::::::::M  aaaaaaaaaaaaa  nnnn  nnnnnnnn      aaaaaaaaaaaaa     ggggggggg   ggggg    eeeeeeeeeeee    rrrrr   rrrrrrrrr               
M:::::::::::M     M:::::::::::M  a::::::::::::a n:::nn::::::::nn    a::::::::::::a   g:::::::::ggg::::g  ee::::::::::::ee  r::::rrr:::::::::r              
M:::::::M::::M   M::::M:::::::M  aaaaaaaaa:::::an::::::::::::::nn   aaaaaaaaa:::::a g:::::::::::::::::g e::::::eeeee:::::eer:::::::::::::::::r             
M::::::M M::::M M::::M M::::::M           a::::ann:::::::::::::::n           a::::ag::::::ggggg::::::gge::::::e     e:::::err::::::rrrrr::::::r            
M::::::M  M::::M::::M  M::::::M    aaaaaaa:::::a  n:::::nnnn:::::n    aaaaaaa:::::ag:::::g     g:::::g e:::::::eeeee::::::e r:::::r     r:::::r            
M::::::M   M:::::::M   M::::::M  aa::::::::::::a  n::::n    n::::n  aa::::::::::::ag:::::g     g:::::g e:::::::::::::::::e  r:::::r     rrrrrrr            
M::::::M    M:::::M    M::::::M a::::aaaa::::::a  n::::n    n::::n a::::aaaa::::::ag:::::g     g:::::g e::::::eeeeeeeeeee   r:::::r                        
M::::::M     MMMMM     M::::::Ma::::a    a:::::a  n::::n    n::::na::::a    a:::::ag::::::g    g:::::g e:::::::e            r:::::r                        
M::::::M               M::::::Ma::::a    a:::::a  n::::n    n::::na::::a    a:::::ag:::::::ggggg:::::g e::::::::e           r:::::r                        
M::::::M               M::::::Ma:::::aaaa::::::a  n::::n    n::::na:::::aaaa::::::a g::::::::::::::::g  e::::::::eeeeeeee   r:::::r                        
M::::::M               M::::::M a::::::::::aa:::a n::::n    n::::n a::::::::::aa:::a gg::::::::::::::g   ee:::::::::::::e   r:::::r                        
MMMMMMMM               MMMMMMMM  aaaaaaaaaa  aaaa nnnnnn    nnnnnn  aaaaaaaaaa  aaaa   gggggggg::::::g     eeeeeeeeeeeeee   rrrrrrr                        
                                                                                               g:::::g                                                     
                                                                                   gggggg      g:::::g                                                     
                                                                                   g:::::gg   gg:::::g                                                     
                                                                                    g::::::ggg:::::::g                                                     
                                                                                     gg:::::::::::::g                                                      
                                                                                       ggg::::::ggg                                                        
                                                                                          gggggg                                                                                                                                                                                                                                   
`;
console.log(asciiArt);

const promptUser = () => {
	inquirer
		.prompt([
			{
				name: 'choices',
				type: 'list',
				message: 'Please select an option:',
				choices: [
					'View All Departments',
					'View All Roles',
					'View All Employees',
					'Add Department',
					'Add Role',
					'Add Employee',
					'View Employees By Department',
					'Update Employee Role',
					'Update Employee Manager',
					'Remove Employee',
					'Remove Role',
					'Remove Department',
					'Exit',
				],
			},
		])
		.then(answers => {
			const { choices } = answers;

			if (choices === 'View All Employees') {
				viewAllEmployees();
			}

			if (choices === 'View All Departments') {
				viewAllDepartments();
			}

			if (choices === 'View Employees By Department') {
				viewEmployeesByDepartment();
			}

			if (choices === 'Add Employee') {
				addEmployee();
			}

			if (choices === 'Remove Employee') {
				removeEmployee();
			}

			if (choices === 'Update Employee Role') {
				updateEmployeeRole();
			}

			if (choices === 'Update Employee Manager') {
				updateEmployeeManager();
			}

			if (choices === 'View All Roles') {
				viewAllRoles();
			}

			if (choices === 'Add Role') {
				addRole();
			}

			if (choices === 'Remove Role') {
				removeRole();
			}

			if (choices === 'Add Department') {
				addDepartment();
			}

			if (choices === 'Remove Department') {
				removeDepartment();
			}

			if (choices === 'Exit') {
				connection.end();
			}
		});
};

// View all Departments
const viewAllDepartments = () => {

	connection.query(`SELECT department.id 
				AS id, department.department_name 
					AS department 
						FROM department`, (error, response) => {
		if (error) throw error;
		console.log(`======================================= All Departments =============================================`);
		console.table(response);
		console.log(`====================================================================================`);
		promptUser();
	});
};

//Begin View Section
const viewAllEmployees = () => {

	connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS 'department', role.salary
			FROM employee, role, department 
            	WHERE department.id = role.department_id 
            		AND role.id = employee.role_id
            			ORDER BY employee.id ASC`, (error, response) => {
		if (error) throw error;
		console.log(`======================================= Current Employees =============================================`);
		console.table(response);
		console.log(`=======================================================================================================`);
		promptUser();
	});
};


// View all Roles
const viewAllRoles = () => {
	console.log(`============================================ All ROLES ===================================================`);

	connection.query(`SELECT role.id, role.title, department.department_name AS department
            FROM role
                INNER JOIN department ON role.department_id = department.id`, (error, response) => {
		if (error) throw error;
		response.forEach(role => {
			console.log(role.title);
		});
		console.log(`========================================================================================================`);
		promptUser();
	});
};



// View all Employees by Department
const viewEmployeesByDepartment = () => {
	const sql = ` SELECT employee.first_name, 
                employee.last_name,
                department.department_name AS department
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id`;
	connection.query(sql, (error, response) => {
		if (error) throw error;
		console.log(`================================== Employees by Department ==================================================`);
		console.table(response);
		console.log(`=============================================================================================================`);
		promptUser();
	});
};

// start ADD section
// Add a New Employee
const addEmployee = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'fistName',
				message: "What is the employee's first name?",
				validate: addFirstName => {
					if (addFirstName) {
						return true;
					} else {
						console.log('Please enter a first name');
						return false;
					}
				},
			},
			{
				type: 'input',
				name: 'lastName',
				message: "What is the employee's last name?",
				validate: addLastName => {
					if (addLastName) {
						return true;
					} else {
						console.log('Please enter a last name');
						return false;
					}
				},
			},
		])
		.then(answer => {
			const firstLast = [answer.fistName, answer.lastName];
			const roleSQL = `SELECT role.id, role.title FROM role`;
			connection.query(roleSQL, (error, data) => {
				if (error) throw error;
				const roles = data.map(({ id, title }) => ({ name: title, value: id }));
				inquirer
					.prompt([
						{
							type: 'list',
							name: 'role',
							message: "What is the employee's role?",
							choices: roles,
						},
					])
					.then(roleChoice => {
						const role = roleChoice.role;
						firstLast.push(role);
						const managerSql = `SELECT * FROM employee`;
						connection.query(managerSql, (error, data) => {
							if (error) throw error;
							const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
							inquirer
								.prompt([
									{
										type: 'list',
										name: 'manager',
										message: "Who is the employee's manager?",
										choices: managers,
									},
								])
								.then(managerChoice => {
									const manager = managerChoice.manager;
									firstLast.push(manager);
									const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                VALUES (?, ?, ?, ?)`;
									connection.query(sql, firstLast, error => {
										if (error) throw error;
										console.log('Employee has been added!');
										viewAllEmployees();
									});
								});
						});
					});
			});
		});
};

// Add New Role
const addRole = () => {
	const sql = 'SELECT * FROM department';
	connection.query(sql, (error, response) => {
		if (error) throw error;
		let deptNamesArray = [];
		response.forEach(department => {
			deptNamesArray.push(department.department_name);
		});
		deptNamesArray.push('Create Department');
		inquirer
			.prompt([
				{
					name: 'departmentName',
					type: 'list',
					message: 'Which department is this new role in?',
					choices: deptNamesArray,
				},
			])
			.then(answer => {
				if (answer.departmentName === 'Create Department') {
					this.addDepartment();
				} else {
					addRoleResume(answer);
				}
			});

		const addRoleResume = departmentData => {
			inquirer
				.prompt([
					{
						name: 'newRole',
						type: 'input',
						message: 'What is the name of your new role?',
						validate: validate.validateString,
					},
					{
						name: 'salary',
						type: 'input',
						message: 'What is the salary of this new role?',
					},
				])
				.then(answer => {
					let createdRole = answer.newRole;
					let departmentId;

					response.forEach(department => {
						if (departmentData.departmentName === department.department_name) {
							departmentId = department.id;
						}
					});

					let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
					let firstLast = [createdRole, answer.salary, departmentId];

					connection.query(sql, firstLast, error => {
						if (error) throw error;
						console.log(`========================================== Role successfully created ==========================================`);
						console.log(`===============================================================================================================`);
						viewAllRoles();
					});
				});
		};
	});
};

// Add a New Department
const addDepartment = () => {
	inquirer
		.prompt([
			{
				name: 'newDepartment',
				type: 'input',
				message: 'What is the name of your new Department?',
				validate: validate.validateString,
			},
		])
		.then(answer => {
			let sql = `INSERT INTO department (department_name) VALUES (?)`;
			connection.query(sql, answer.newDepartment, (error, response) => {
				if (error) throw error;
				console.log(`====================================== ${answer.newDepartment} Department successfully created ===========================`);
				viewAllDepartments();
			});
		});
};

// Update section
// Update an Employee's Role
const updateEmployeeRole = () => {
	let sql = ` SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
              FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
	connection.query(sql, (error, response) => {
		if (error) throw error;
		let employeeNamesArray = [];
		response.forEach(employee => {
			employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
		});

		let sql = `SELECT role.id, role.title FROM role`;
		connection.query(sql, (error, response) => {
			if (error) throw error;
			let rolesArray = [];
			response.forEach(role => {
				rolesArray.push(role.title);
			});
			inquirer
				.prompt([
					{
						name: 'chosenEmployee',
						type: 'list',
						message: 'Which employee has a new role?',
						choices: employeeNamesArray,
					},
					{
						name: 'chosenRole',
						type: 'list',
						message: 'What is their new role?',
						choices: rolesArray,
					},
				])
				.then(answer => {
					let newTitleId, employeeId;
					response.forEach(role => {
						if (answer.chosenRole === role.title) {
							newTitleId = role.id;
						}
					});
					response.forEach(employee => {
						if (answer.chosenEmployee === `${employee.first_name} ${employee.last_name}`) {
							employeeId = employee.id;
						}
					});
					let sqls = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
					connection.query(sqls, [newTitleId, employeeId], error => {
						if (error) throw error;
						console.log(`================================ Employee Role Updated ====================================================`);
						promptUser();
					});
				});
		});
	});
};

// Update an Employee's Manager
const updateEmployeeManager = () => {
	let sql = ` SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id
              FROM employee`;
	connection.query(sql, (error, response) => {
		let employeeNamesArray = [];
		response.forEach(employee => {
			employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
		});

		inquirer
			.prompt([
				{
					name: 'chosenEmployee',
					type: 'list',
					message: 'Which employee has a new manager?',
					choices: employeeNamesArray,
				},
				{
					name: 'newManager',
					type: 'list',
					message: 'Who is their manager?',
					choices: employeeNamesArray,
				},
			])
			.then(answer => {
				let employeeId, managerId;
				response.forEach(employee => {
					if (answer.chosenEmployee === `${employee.first_name} ${employee.last_name}`) {
						employeeId = employee.id;
					}

					if (answer.newManager === `${employee.first_name} ${employee.last_name}`) {
						managerId = employee.id;
					}
				});

				if (validate.isSame(answer.chosenEmployee, answer.newManager)) {
					console.log(`========================================= Invalid Manager Selection ===========================================`);
					promptUser();
				} else {
					let sql = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;

					connection.query(sql, [managerId, employeeId], error => {
						if (error) throw error;
						console.log(`=================================== Employee Manager Updated =================================================`);
						promptUser();
					});
				}
			});
	});
};

// Remove User Section
// Delete Employee
const removeEmployee = () => {
	let sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;
	connection.query(sql, (error, response) => {
		if (error) throw error;
		let employeeNamesArray = [];
		response.forEach(employee => {
			employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
		});
		inquirer
			.prompt([
				{
					name: 'chosenEmployee',
					type: 'list',
					message: 'Which employee would you like to remove?',
					choices: employeeNamesArray,
				},
			])
			.then(answer => {
				let employeeId;

				response.forEach(employee => {
					if (answer.chosenEmployee === `${employee.first_name} ${employee.last_name}`) {
						employeeId = employee.id;
					}
				});

				let sql = `DELETE FROM employee WHERE employee.id = ?`;
				connection.query(sql, [employeeId], error => {
					if (error) throw error;
					console.log(`============================================= Employee Successfully Removed =======================================`);
					viewAllEmployees();
				});
			});
	});
};

// Delete Role
const removeRole = () => {
	let sql = `SELECT role.id, role.title FROM role`;
	connection.query(sql, (error, response) => {
		if (error) throw error;
		let roleNamesArray = [];
		response.forEach(role => {
			roleNamesArray.push(role.title);
		});
		inquirer
			.prompt([
				{
					name: 'chosenRole',
					type: 'list',
					message: 'Which role would you like to remove?',
					choices: roleNamesArray,
				},
			])
			.then(answer => {
				let roleId;
				response.forEach(role => {
					if (answer.chosenRole === role.title) {
						roleId = role.id;
					}
				});
				let sql = `DELETE FROM role WHERE role.id = ?`;
				connection.query(sql, [roleId], error => {
					if (error) throw error;
					console.log(`==================================== Role Successfully Removed ================================================`);
					viewAllRoles();
				});
			});
	});
};

// Delete a Department
const removeDepartment = () => {
	let sql = `SELECT department.id, department.department_name FROM department`;
	connection.query(sql, (error, response) => {
		if (error) throw error;
		let departmentNamesArray = [];
		response.forEach(department => {
			departmentNamesArray.push(department.department_name);
		});
		inquirer
			.prompt([
				{
					name: 'chosenDept',
					type: 'list',
					message: 'Which department would you like to remove?',
					choices: departmentNamesArray,
				},
			])
			.then(answer => {
				let departmentId;
				response.forEach(department => {
					if (answer.chosenDept === department.department_name) {
						departmentId = department.id;
					}
				});
				let sql = `DELETE FROM department WHERE department.id = ?`;
				connection.query(sql, [departmentId], error => {
					if (error) throw error;
					console.log(`========================================== Department Successfully Removed ==========================================`);
					viewAllDepartments();
				});
			});
	});
};
