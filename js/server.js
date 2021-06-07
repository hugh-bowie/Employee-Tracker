////dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const express = require('express');

////declarations
const app = express();
const PORT = 3001;

//use express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection.connect(error => {
	if (error) throw error;
});

let asciiArt = `
                                                                                                                                                              
                                                                                                                                                            
EEEEEEEEEEEEEEEEEEEEEE                                            lllllll                                                                                   
E::::::::::::::::::::E                                            l:::::l                                                                                   
E::::::::::::::::::::E                                            l:::::l                                                                                   
EE::::::EEEEEEEEE::::E                                            l:::::l                                                                                   
  E:::::E       EEEEEE   mmmmmmm    mmmmmmm   ppppp   ppppppppp    l::::l    ooooooooooo   yyyyyyy           yyyyyyy    eeeeeeeeeeee        eeeeeeeeeeee    
  E:::::E              mm:::::::m  m:::::::mm p::::ppp:::::::::p   l::::l  oo:::::::::::oo  y:::::y         y:::::y   ee::::::::::::ee    ee::::::::::::ee  
  E::::::EEEEEEEEEE   m::::::::::mm::::::::::mp:::::::::::::::::p  l::::l o:::::::::::::::o  y:::::y       y:::::y   e::::::eeeee:::::ee e::::::eeeee:::::ee
  E:::::::::::::::E   m::::::::::::::::::::::mpp::::::ppppp::::::p l::::l o:::::ooooo:::::o   y:::::y     y:::::y   e::::::e     e:::::ee::::::e     e:::::e
  E:::::::::::::::E   m:::::mmm::::::mmm:::::m p:::::p     p:::::p l::::l o::::o     o::::o    y:::::y   y:::::y    e:::::::eeeee::::::ee:::::::eeeee::::::e
  E::::::EEEEEEEEEE   m::::m   m::::m   m::::m p:::::p     p:::::p l::::l o::::o     o::::o     y:::::y y:::::y     e:::::::::::::::::e e:::::::::::::::::e 
  E:::::E             m::::m   m::::m   m::::m p:::::p     p:::::p l::::l o::::o     o::::o      y:::::y:::::y      e::::::eeeeeeeeeee  e::::::eeeeeeeeeee  
  E:::::E       EEEEEEm::::m   m::::m   m::::m p:::::p    p::::::p l::::l o::::o     o::::o       y:::::::::y       e:::::::e           e:::::::e           
EE::::::EEEEEEEE:::::Em::::m   m::::m   m::::m p:::::ppppp:::::::pl::::::lo:::::ooooo:::::o        y:::::::y        e::::::::e          e::::::::e          
E::::::::::::::::::::Em::::m   m::::m   m::::m p::::::::::::::::p l::::::lo:::::::::::::::o         y:::::y          e::::::::eeeeeeee   e::::::::eeeeeeee  
E::::::::::::::::::::Em::::m   m::::m   m::::m p::::::::::::::pp  l::::::l oo:::::::::::oo         y:::::y            ee:::::::::::::e    ee:::::::::::::e  
EEEEEEEEEEEEEEEEEEEEEEmmmmmm   mmmmmm   mmmmmm p::::::pppppppp    llllllll   ooooooooooo          y:::::y               eeeeeeeeeeeeee      eeeeeeeeeeeeee  
                                              p:::::p                                            y:::::y                                                    
                                              p:::::p                                           y:::::y                                                     
                                              p:::::::p                                        y:::::y                                                      
                                              p:::::::p                                       y:::::y                                                       
                                              p:::::::p                                       yyyyyyy                                                        
                                              ppppppppp                                                                                                     
                                                                                                                                                            
                                                                                                                                                            
TTTTTTTTTTTTTTTTTTTTTTT                                                          kkkkkkkk                                                                   
T:::::::::::::::::::::T                                                          k::::::k                                                                   
T:::::::::::::::::::::T                                                          k::::::k                                                                   
T:::::TT:::::::TT:::::T                                                          k::::::k                                                                   
TTTTTT  T:::::T  TTTTTTrrrrr   rrrrrrrrr     aaaaaaaaaaaaa       cccccccccccccccc k:::::k    kkkkkkk    eeeeeeeeeeee    rrrrr   rrrrrrrrr                   
        T:::::T        r::::rrr:::::::::r    a::::::::::::a    cc:::::::::::::::c k:::::k   k:::::k   ee::::::::::::ee  r::::rrr:::::::::r                  
        T:::::T        r:::::::::::::::::r   aaaaaaaaa:::::a  c:::::::::::::::::c k:::::k  k:::::k   e::::::eeeee:::::eer:::::::::::::::::r                 
        T:::::T        rr::::::rrrrr::::::r           a::::a c:::::::cccccc:::::c k:::::k k:::::k   e::::::e     e:::::err::::::rrrrr::::::r                
        T:::::T         r:::::r     r:::::r    aaaaaaa:::::a c::::::c     ccccccc k::::::k:::::k    e:::::::eeeee::::::e r:::::r     r:::::r                
        T:::::T         r:::::r     rrrrrrr  aa::::::::::::a c:::::c              k:::::::::::k     e:::::::::::::::::e  r:::::r     rrrrrrr                
        T:::::T         r:::::r             a::::aaaa::::::a c:::::c              k:::::::::::k     e::::::eeeeeeeeeee   r:::::r                            
        T:::::T         r:::::r            a::::a    a:::::a c::::::c     ccccccc k::::::k:::::k    e:::::::e            r:::::r                            
      TT:::::::TT       r:::::r            a::::a    a:::::a c:::::::cccccc:::::ck::::::k k:::::k   e::::::::e           r:::::r                            
      T:::::::::T       r:::::r            a:::::aaaa::::::a  c:::::::::::::::::ck::::::k  k:::::k   e::::::::eeeeeeee   r:::::r                            
      T:::::::::T       r:::::r             a::::::::::aa:::a  cc:::::::::::::::ck::::::k   k:::::k   ee:::::::::::::e   r:::::r                            
      TTTTTTTTTTT       rrrrrrr              aaaaaaaaaa  aaaa    cccccccccccccccckkkkkkkk    kkkkkkk    eeeeeeeeeeeeee   rrrrrrr                            
                                                                                                                                                            
                                                                                                                                                            
                                                                                                                                                            
                                                                                                                                                            
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

//Begin View Section
const viewAllEmployees = () => {
	let sql = `SELECT employee.id, 
              employee.first_name, 
              employee.last_name, 
              role.title, 
              department.department_name AS 'department', 
              role.salary
              FROM employee, role, department 
              WHERE department.id = role.department_id 
              AND role.id = employee.role_id
              ORDER BY employee.id ASC`;

	connection.promise().query(sql, (error, response) => {
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
	const sql = `SELECT role.id, role.title, department.department_name AS department
                FROM role
                INNER JOIN department ON role.department_id = department.id`;
	connection.promise().query(sql, (error, response) => {
		if (error) throw error;
		response.forEach(role => {
			console.log(role.title);
		});
		console.log(`========================================================================================================`);
		promptUser();
	});
};

// View all Departments
const viewAllDepartments = () => {
	const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
	connection.promise().query(sql, (error, response) => {
		if (error) throw error;
		console.log(`========================================= All Departments ===============================================`);
		console.table(response);
		console.log(`=========================================================================================================`);
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
			connection.promise().query(roleSQL, (error, data) => {
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
						connection.promise().query(managerSql, (error, data) => {
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
	connection.promise().query(sql, (error, response) => {
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

					connection.promise().query(sql, firstLast, error => {
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
				console.log(`==========================================================================================================================`);
				viewAllDepartments();
			});
		});
};

// Update section
// Update an Employee's Role
const updateEmployeeRole = () => {
	let sql = ` SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
              FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
	connection.promise().query(sql, (error, response) => {
		if (error) throw error;
		let employeeNamesArray = [];
		response.forEach(employee => {
			employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
		});

		let sql = `SELECT role.id, role.title FROM role`;
		connection.promise().query(sql, (error, response) => {
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
	connection.promise().query(sql, (error, response) => {
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
					console.log(`===============================================================================================================`);
					promptUser();
				} else {
					let sql = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;

					connection.query(sql, [managerId, employeeId], error => {
						if (error) throw error;
						console.log(`=================================== Employee Manager Updated =================================================`);
						console.log(`==============================================================================================================`);
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
	connection.promise().query(sql, (error, response) => {
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
					console.log(`===================================================================================================================`);
					viewAllEmployees();
				});
			});
	});
};

// Delete Role
const removeRole = () => {
	let sql = `SELECT role.id, role.title FROM role`;
	connection.promise().query(sql, (error, response) => {
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
				connection.promise().query(sql, [roleId], error => {
					if (error) throw error;
					console.log(`==================================== Role Successfully Removed ================================================`);
					console.log(`===============================================================================================================`);
					viewAllRoles();
				});
			});
	});
};

// Delete a Department
const removeDepartment = () => {
	let sql = `SELECT department.id, department.department_name FROM department`;
	connection.promise().query(sql, (error, response) => {
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
				connection.promise().query(sql, [departmentId], error => {
					if (error) throw error;
					console.log(`========================================== Department Successfully Removed ==========================================`);
					console.log(`=====================================================================================================================`);
					viewAllDepartments();
				});
			});
	});
};
