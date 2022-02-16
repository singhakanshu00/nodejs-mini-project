const yargs = require('yargs');
const fs = require('fs');
// console.log(process.argv);
// console.log(yargs.argv);
if(process.argv[2] === "add"){
    yargs.command({
        command:"add",
        describe: "Adding a note",
        builder: {
            title: {
                describe: 'Note title',
                demandOption:true,
                type: String
            },
            body: {
                describe: 'Note body',
                demandOption:true,
                type: String
            }
        },
        handler: function(argv){
            
                let newData = {
                    title: argv.title,
                    body: argv.body
                };
                if(fs.existsSync("notes.json")){
                    var data = fs.readFileSync("notes.json", {encoding: "utf8"});
                    var myObject;
                    console.log( data[0]);
                    if(data[0]!='['){
                        myObject = [JSON.parse(data)];
                    }
                    else{
                        myObject = [...JSON.parse(data)];
                    }
                    myObject.push(newData);
                    var newData2 = JSON.stringify(myObject);
                    fs.writeFile("notes.json", newData2, (err) => {
                        // Error checking
                        if (err) throw err;
                        console.log("New data added");
                    });
                }
    
                else{
                    let newData2 = JSON.stringify(newData);
                    fs.writeFile("notes.json", newData2, (err) => {
                        // Error checking
                        if (err) throw err;
                        console.log("New data added");
                    });
                }
                
            }
    });
}
if(process.argv[2]==="remove"){
    yargs.command({
        command: "remove",
        describe: "Removing a note",
        builder: {
            title: {
                describe: 'Note title',
                demandOption:true,
                type: String
            }
        },
        handler: (argv)=>{
            var data = fs.readFileSync("notes.json");
            var myObject = [...JSON.parse(data)];
            for (let index = 0; index < myObject.length; index++) {
                if(myObject[index]["title"] == argv.title){
                    myObject.splice(index,1);
                    break;
                }
            }
            var newData2 = JSON.stringify(myObject);
                    fs.writeFile("notes.json", newData2, (err) => {
                        // Error checking
                        if (err) throw err;
                        console.log("removed");
                    });
        }
    });
}
if(process.argv[2]==="list"){
    yargs.command({
        command: "list",
        describe: "Printing all notes",
        handler: (argv)=>{
            var data = fs.readFileSync("notes.json");
            var myObject = [...JSON.parse(data)];
            for (let index = 0; index < myObject.length; index++) {
                console.log(myObject[index]["title"]);
            }}
    });
}
if(process.argv[2]==="read"){
    yargs.command({
        command: "read",
        describe: "Reading a note",
        builder: {
            title: {
                describe: 'Note title',
                demandOption:true,
                type: String
            }
        },
        handler: (argv)=>{
            var data = fs.readFileSync("notes.json");
            var myObject = [...JSON.parse(data)];
            for (let index = 0; index < myObject.length; index++) {
                if(myObject[index]["title"] == argv.title){
                   console.log(myObject[index]["body"]);
                    break;
                }
            }}
    });
}
yargs.parse();