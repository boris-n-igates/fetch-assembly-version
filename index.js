const core = require('@actions/core');
const github = require('@actions/github');

try{
    core.setOutput("assembly-version", "123456789aaaa");
}catch (error){
    core.setFailed(error.message);
}