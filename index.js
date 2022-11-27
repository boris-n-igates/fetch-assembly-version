const core = require('@actions/core');
const path = require('path');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

try{
    
    const rootPath = core.getInput("project-path", { required: true })
    const projectFilePath = getProjectPropertiesFile(rootPath)

    console.log('projectFilePath ' + projectFilePath);

    if(projectFilePath !== ''){
        const promise = JSDOM.fromFile(projectFilePath)

        promise.then((value) =>{
            const xmlDoc = value.window.document
            const propertyGroupList = xmlDoc.getElementsByTagName('PropertyGroup')
            if (propertyGroupList.length > 0){
                const versions = propertyGroupList[0].getElementsByTagName('AssemblyVersion');
                if(versions.length > 0){
                    const version =  versions[0].innerHTML;
                    setOutputs(version);
                }
            }
        })
        .catch((reason) => {
            console.log('Failure reason' + reason);
        })
    }

}catch (error){
    core.setFailed(error.message);
}

function getProjectPropertiesFile(folder){
  
    fs.readdir(folder, function(error, files){
        if (error) {
            return console.log('Unable to scan directory: ' + err);
        } 
        let file = files.find((value, index) => {
            return path.extname(value) === '.csproj'
        }) 
        return path.join(folder, file)
    })
    return '';
}

function setOutputs(version){
    let groups = version.split('.');
    core.setOutput('assembly-version', version)
    if(groups.length > 3){
        core.setOutput('major', groups[0]);
        core.setOutput('minor', groups[1]);
        core.setOutput('revision', groups[2]);
        core.setOutput('build', groups[3]);
    }
}
