const core = require('@actions/core');
const path = require('path');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

try{
    
    const rootPath = core.getInput("project-path", { required: true });
    const projectFilePath = getProjectPropertiesFile(rootPath);

    if(projectFilePath !== '' && projectFilePath !== undefined){
        const promise = JSDOM.fromFile(projectFilePath);

        promise.then((value) =>{
            const xmlDoc = value.window.document;
            const propertyGroupList = xmlDoc.getElementsByTagName('PropertyGroup');
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
    const files = fs.readdirSync(folder);

    let file = files.find((value, index) => {
        return path.extname(value) === '.csproj';
    }) 

    return path.join(folder,file);
}

function setOutputs(version){
    const reg = new RegExp('.', 'g');
    const ver = version.replace(reg,'');
    core.setOutput('assembly-version', ver);

    let groups = version.split('.');
    if(groups.length > 3){
        core.setOutput('major', groups[0]);
        core.setOutput('minor', groups[1]);
        core.setOutput('revision', groups[2]);
        core.setOutput('build', groups[3]);
    }
}
