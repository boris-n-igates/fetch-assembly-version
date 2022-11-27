const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const fs = require('fs');


try{
    console.log(`Hello jdhjkshdjkdhfkjhd`);
    core.setOutput("assembly-version", "123456789aaaa");
    const rootPath = core.getInput("project-path", { required: true })
    fs.readdir(rootPath, function(error, files){
        if (error) {
            return console.log('Unable to scan directory: ' + err);
        } 
        const ind = files.findIndex((value, index) => {
            return value.includes('csproj');
        }) 

        console.log('--------- ' + files[ind]);
    })

}catch (error){
    core.setFailed(error.message);
}
