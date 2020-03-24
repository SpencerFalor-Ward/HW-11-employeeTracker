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
    database: 'employee',
})

connection.connect(function(err) {
    if (err) throw err
    // run the start function after the connection is made to prompt the user
    promptUser()
})

async function promptUser() {
    let answers
    try {
        const answers = await inquirer.prompt({
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'create department',
                'add employee',
                'add employee role',
                'update employee info',
            ],
        })
    } catch (error) {
        console.log(error)
    }
}

async function tableAction() {
    try {
        var action = await function(answer) {
            switch (answer.choice) {
                case 'create department':
                    createDepartment()
                    break
                case 'add employee':
                    addEmployee()
                    break
                case 'add employee role':
                    addEmployeeRole()
                    break
                case 'update employee info':
                    updateEmployee()
                    break
            }
            //     // based on their answer, either call the bid or the post functions
            // if (answer.choice === 'create department') {
            //     createDepartment()
            //     } else if (answer.postOrBid === 'BID') {
            //         bidAuction()
            //     } else {
            //         connection.end()
            // }
            console.log(answer)
        }
    } catch (error) {
        console.log(error)
    }
}
tableAction();