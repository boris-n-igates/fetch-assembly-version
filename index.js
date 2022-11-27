const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


try{
    
    const rootPath = core.getInput("project-path", { required: true })
    console.log('---------- ' + rootPath);
    fs.readdir(rootPath, function(error, files){
        if (error) {
            return console.log('Unable to scan directory: ' + err);
        } 
        let ind = files.findIndex((value, index) => {
            return path.extname(value) === '.csproj'
        }) 

        console.log('---------- rootPath ' + rootPath + '/' + files[ind]);

        const buffer = fs.readFileSync(rootPath + '/' + files[ind]);
        console.log('---------- buffer.toString' + buffer.length);
    
        const dom = new JSDOM(buffer)
        const xmlDoc = dom.window.document

       
        
     
        const propertyGroupList = xmlDoc.getElementsByTagName('PropertGroup')
        
        if (propertyGroupList.length > 0){
            console.log('-propertyGroupList[0]  ' + propertyGroupList[0].innerHTML);
            const versions = propertyGroupList[0].getElementsByTagName('AssemblyVersion')
            if(version.length > 0){
                console.log('-versions[0].innerHTML ' + versions[0].innerHTML);
                
            }
        }

      
    })

}catch (error){
    core.setFailed(error.message);
}
