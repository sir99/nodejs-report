const axios         = require("axios");
const fs            = require("fs");
const util          = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function main() {
    const url = "https://swapi.dev/api/people/1";
    let personData;

    axios.get(url).then((res) => {
        personData                  = res.data;
        return axios.get(res.data.homeworld)
    }).then((homeworldRes) => {
        const homeworldName         = homeworldRes.data.name;
        personData.homeworldName    = homeworldName;
        const md                    = renderMarkdown(personData);
        return writeFileAsync(`fact-sheet${Date.now()}.md`, md);
    }).then(() => {
        console.log("Created fact-sheet.md");
    })
    .catch((err) => {
        console.log(err)
    });
    console.log(personData);
}

module.exports = main();

function renderMarkdown(data) {
     
    return `# ${data.name} ## Biometrics

    ## Info

    **Height:** ${data.height} cm
    
    **Mass:** ${data.mass} kg
    
    **Hair Color:** ${data.hair_color}
    
    **Eye Color:** ${data.eye_color}
    
    **Gender:** ${data.gender}
    
    **Birth Year:** ${data.birth_year}
    
    **Homeworld:** ${data.homeworldName}`;
    
}