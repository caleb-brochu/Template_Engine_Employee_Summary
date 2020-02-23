const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
const buildteam = [
    {
      type: "confirm",
      name: "build",
      message: "What is your Would you like to build a team?"
    }
];
const employeeQs =[
    {
        type: "input",
        name: "name",
        message: "Enter employees name:"
        
    },
    {
        type: "input",
        name: "id",
        message: "Enter employees ID:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter employees email:"
    },
    {
        type: "list",
        name: "profession",
        message: "Select employees profession:",
        choices:[
            "Manager",
            "Engineer",
            "Intern"
        ]
    }
];
const managerQs = [
    {
        type: "input",
        name: "phone",
        message: `Enter managers phone number:`
    }
];
const engineerQs = [
    {
        type: "input",
        name: "github",
        message: `Enter engineers github username:`
    }
];
const internQs = [
    {
        type: "input",
        name: "school",
        message: `Enter school intern attends:`
    }
];

const continueAdding = [
    {
        type: "confirm",
        name: "newEmployee",
        message: "Would you like to add another member to your team?"
    }
]

function askQuestions(){
        inquirer.prompt(employeeQs).then(function(res){
            
            if(res.profession === "Manager"){
                //console.log(res);
                inquirer.prompt(managerQs).then(function(phone){
                    employees.push({...res, ...phone}); 
                }).then(function(){
                    addEmployee();
                });

            }
            else if (res.profession === "Engineer"){
                inquirer.prompt(engineerQs).then(function(github){
                    employees.push({...res, ...github}); 
                }).then(function(){
                    addEmployee();
                });
            }
            else{
                inquirer.prompt(internQs).then(function(school){
                    employees.push({...res, ...school}); 
                }).then(function(){
                    addEmployee();
                });
            }
            
        })
    };
askQuestions()
function addEmployee(){
    inquirer.prompt(continueAdding).then(function(res){
        if(res.newEmployee === true){
            askQuestions();
        }else{
    
            console.log("User has completed building team!");
            generateTeam()
        }
    })
}

 function generateTeam(){
    const employeeList =[];
    employees.forEach(function(i){
        switch(i.profession){
            case "Manager":
                employeeList.push(new Manager(i.name, i.id, i.email, i.phone));
                break;
            case "Engineer":
                employeeList.push(new Engineer(i.name, i.id, i.email, i.github));
                break;
            case "Intern":
                employeeList.push(new Intern(i.name, i.id, i.email, i.school));
                break;
            default:
                console.log("error at switch");
        }
    });
    const teamHTML = render(employeeList); 
    //console.log(employeeList)

    fs.writeFile(`employeeList.html`, teamHTML,function(err){
        if (err) throw err;
        console.log ('html generated')
    })
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```