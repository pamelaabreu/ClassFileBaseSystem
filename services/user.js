const fs = require('fs');

const checkQuery = (student) => {
    const entries = Object.entries(student);
    let err = false;
    for (let [keyName, keyValue] of entries) {       
        if((typeof keyValue) === 'undefined' || (typeof keyValue) === 'null'){
           err = true;
        }  
    }
    return err;
}

const add = (student, cb) => {
    
    if(checkQuery(student)){
        cb({
            error: 'Please fill out all the information for the student!',
        })} else {
            cb(addStudent(student))
        }
}

const addStudent = (student) => {
    const {name, city} = student;
    const grade = parseInt(student.grade);
    const age = parseInt(student.age);
    const {className} = student;
    const studentData = {name, age, city, grade};
    const file_name = `${className}.json`;

    fs.readFile(`./classes/${file_name}`, 'utf8', (readErr, readData) => {
        if(!readData){
            const students = [];
            students.push({name, age, city, grade});
            fs.writeFile(`./classes/${file_name}`, JSON.stringify({students}, null, 4), (writeErr, writeRes) => {
                // if(writeErr){
                //     return {
                //         'message': "something went wrong!",
                //         "err": err,
                //     }
                // }
            });
        } else {
            const readStudentData = JSON.parse(readData);
            let students = readStudentData.students;
            let toggle = 0;
    
            for(let i=0; i<students.length; i++){
                let dataName = students[i].name;
                if(dataName === name){
                    toggle = 1;
                    students[i] = studentData;
                    break;
                } 
            }

            if(toggle === 0){
                    students.push(studentData);
                }

            
            fs.writeFile(`./classes/${file_name}`, JSON.stringify({students}, null, 4), (writeErr, writeRes) => {})
              
        }
    })

        return {
            'added!': studentData,
            'class': className
        }
}

const list = (className, cb) => {
    if(checkQuery(className)){
        cb({
            error: 'Please fill out all the information!',
        })} else {
            listClass(className, (response) => {
                cb(response)
            })
        }
}

const listClass = (className, cb) => {
    const file_name = `${className}.json`;

    fs.readFile(`./classes/${file_name}`, 'utf8', (readErr, readData) => {
        if(readErr){
            cb({
                error: `Class ${className} doesn't exist.`
            })
        } else {
            const readStudentData = JSON.parse(readData);
            cb(readStudentData);
        }
    })

}



module.exports = {
    add, 
    list,
}
