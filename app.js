// const Choices = require('inquirer/lib/objects/choices')
var inquirer = require('inquirer')
var mysql = require('mysql')
const cTable = require('console.table')
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'root',
    database: 'employee_db',
})

connection.connect(function(err) {
    if (err) throw err
    // run the start function after the connection is made to prompt the user
    promptUser()
})

async function promptUser() {
    //answers defined here so no need to redefine after try{}
    let answers
    try {
        answers = await inquirer.prompt({
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'create department',
                'add employee',
                'update employee info',
                'view employee data table',
                'exit',
            ],
        })
    } catch (error) {
        console.log(error)
    }
    console.log(answers)
    tableAction(answers) //passing answers as promptUser
}

const tableAction = async promptUser => {
    switch (promptUser.choice) {
        case 'create department':
            try {
                await createDepartment()
            } catch (err) {
                throw err
            }
            break
        case 'add employee':
            try {
                await addEmployee()
                await addEmployeeRole()
                await updateEmployee()
            } catch (err) {
                throw err
            }
            break
        // case 'update employee info':
        //     try {
        //         await updateEmployeeInfo()
        //     } catch (err) {
        //         throw err
        //     }
        //     break
        case 'view employee data table':
            try {
                await readTable()
            } catch (err) {
                throw err
            }
            break
        case 'Exit':
            // exit()
            //     .then()
            //     .catch(err => console.log(err))
            break
    }
    console.log(promptUser.choice)
}

const createDepartment = async () => {
    console.log('Creating a new department...\n')
    try {
        const departInput = await inquirer.prompt({
            name: 'department',
            type: 'input',
            message: 'What is the name of your department?',
        })
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: departInput.department, //field from table
            },
            function(err, res) {
                if (err) throw err
                //console logs out rows affected
                console.log(res.affectedRows + ' department inserted!\n')
                // Call updateDepartment AFTER the INSERT completes
                promptUser()
            }
        )
        // logs the actual query being run
        console.log(query.sql)
    } catch (error) {}
}
const addEmployee = async () => {
    console.log('Creating a new employee...\n')
    try {
        const { firstName, lastName } = await inquirer.prompt(
            //the { firstName, lastName } extracts the data from the prompt
            [
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the first name of the employee?',
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the last name of the employee?',
                },
            ]
        )

        await connection.query(
            'INSERT INTO employee (first_name, last_name) VALUES (?, ?)',
            [firstName, lastName],
            function(err, res) {
                if (err) throw err
                //console logs out rows affected
                console.log(res.affectedRows + ' employee inserted!\n')
                // Call updateDepartment AFTER the INSERT completes
                // promptUser()
            }
        )

        // logs the actual query being run
        console.log(query.sql)
    } catch (error) {}
}
const addEmployeeRole = async () => {
    console.log('Adding employee role...\n')
    try {
        const role = await inquirer.prompt({
            name: 'title',
            type: 'input',
            message: "What is your employee's title?",
        })

        connection.query(
            'INSERT INTO role SET ?',
            {
                title: role.title, //field from table
            },
            function(err, res) {
                if (err) throw err
                //console logs out rows affected
                console.log(res.affectedRows + ' role insterted!\n')
                // Call updateDepartment AFTER the INSERT completes
                // promptUser()
            }
        )
        // logs the actual query being run
        console.log(query.sql)
    } catch (error) {}
}

const updateEmployee = async () => {
    try {
        await connection.query(
            'SELECT * FROM `employee` LEFT JOIN `role_id` ON `employee.role_id` = `role.id` WHERE `employee.role_id` IS NULL',
            function(err, res) {
                if (err) throw err
                //console logs out rows affected
                console.log(res.affectedRows + ' updated employee info\n')
                // Call updateDepartment AFTER the INSERT completes
                promptUser()
            }
        )
        console.log(query.sql)
    } catch (error) {}
}
const readTable = async () => {
    try {
        console.log('Selecting table...\n')
        connection.query('SELECT * FROM employee', function(err, res) {
            if (err) throw err
            // Log all results of the SELECT statement
            console.table(res)
            connection.end()
        })
    } catch (error) {}
}
