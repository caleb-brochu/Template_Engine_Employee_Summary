// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, role, phone) {
      super(name, id, email, role);
      this.phone = phone;
    }

    getOfficeNumber(){
        return this.phone;
    }
    getRole(){
        return this.role;
    }

}
module.exports = Manager;