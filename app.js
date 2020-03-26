// const Choices = require('inquirer/lib/objects/choices')
var inquirer = require('inquirer')
var mysql = require('mysql')
// var express = require('express');
// const app = express ();

// const PORT = process.env.PORT || 8080

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
                'add employee role',
                'update employee info',
                'view department',
                'exit',
            ],
        })
    } catch (error) {
        console.log(error)
    }
    console.log(answers)
    tableAction(answers) //passing answers as promptUser
}

const tableAction = promptUser => {
    switch (promptUser.choice) {
        case 'create department':
            createDepartment()
                .then()
                .catch(err => console.log(err)) //the .then and the .catch gives us data and executes the "try/catch" of createDepartment()

            break
        case 'view department':
            readDepartment()
                .then()
                .catch(err => console.log(err)) //the .then and the .catch gives us data and executes the "try/catch" of createDepartment()

            break
        case 'add employee':
            addEmployee()
                .then()
                .catch(err => console.log(err))
            break
        case 'add employee role':
            addEmployeeRole()
                .then()
                .catch(err => console.log(err))
            break
        case 'update employee info':
            updateEmployee()
                .then()
                .catch(err => console.log(err))
            break
        case 'Exit':
            exit()
                .then()
                .catch(err => console.log(err))
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

function readDepartment() {
    console.log('Selecting department...\n')
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err
        // Log all results of the SELECT statement
        console.table(res)
        connection.end()
    })
}

const addEmployee = async () => {
    console.log('Creating a new employee...\n')
    try {
        const departInput = await inquirer.prompt({
            name: 'employee',
            type: 'input',
            message: 'What is the name of the employee?',
        })

        connection.query(
            'INSERT INTO employee SET ?',
            {
                name: departInput.department, //field from table
            },
            function(err, res) {
                if (err) throw err
                //console logs out rows affected
                console.log(res.affectedRows + ' employee inserted!\n')
                // Call updateDepartment AFTER the INSERT completes
                promptUser()
            }
        )
        // logs the actual query being run
        console.log(query.sql)
    } catch (error) {}
}