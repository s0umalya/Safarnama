class User {
    constructor(obj){
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.gender = obj.gender;
        this.password = obj.password;
        this.contactNo = obj.contactNo;
        this.dob = obj.dob;
    }
}

module.exports = User;