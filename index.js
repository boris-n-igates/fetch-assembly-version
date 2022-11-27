const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const fs = require('fs');


try{
    
    const rootPath = core.getInput("project-path", { required: true })
    console.log('---------- ' + rootPath);
    fs.readdir(rootPath, function(error, files){
        if (error) {
            return console.log('Unable to scan directory: ' + err);
        } 
        const ind = files.findIndex((value, index) => {
            console.log('---------- ' + value);
            return path.extname(value) === '.csproj'
        }) 

        console.log('---------- ' + files[ind]);
    })

}catch (error){
    core.setFailed(error.message);
}
