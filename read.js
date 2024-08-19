const fs = require("fs");

const data = fs.readFileSync('./x=305y=156z=9.json',{encoding: 'utf8'})

const res = JSON.parse(JSON.parse(data))

res.values.forEach(val => {
    if(val[5] === 184) {
        console.log(val[5], val[6], val[8], val[9])
    }
})