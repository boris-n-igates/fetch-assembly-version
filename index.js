const core = require('@actions/core');
const github = require('@actions/github');

try{
    console.log(`Hello jdhjkshdjkdhfkjhd`);
    core.setOutput("assembly-version", "123456789aaaa");
}catch (error){
    core.setFailed(error.message);
}
