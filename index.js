const {add, list} = require('./services/user.js');
const express = require('express');
const app = express();

const port = 9867; 

app.get('/classlist/add', (req, res) => {

    const {query} = req;

    const {name, city, grade, age} = query;
    const className = query['class'];
    const dataQuery = {name, age, city, grade, className};

    add(dataQuery, response => {
        res.json(response)
    })
    
   
/*
    save(className, {name, age, city, grade}, (err, data) => {
        if (err) {
            res.status(500)
            res.json({
                'message': "something went wrong!",
                "err": err,
            });
            return;
        }

        res.json(data);
    })*/
    

});

app.get('/classlist/list', (req, res) => {

    const {query} = req;

    const className = query['class'];
    

    list(className, response => {
        res.json(response)
    })
});

app.listen(port, () => {
    console.log(`listening at port ${port}`)
});

/*
/classlist/add
Add validation if user passes in 'Pam' or 'pam'
Add validation if user passes invalid characters
Add what missing information to pass if query doesn't pass all 4 data points


*/

