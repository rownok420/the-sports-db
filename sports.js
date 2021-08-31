const errorMessage1 = document.getElementById('error1')
const errorMessage2 = document.getElementById('error2')
const spinner = document.getElementById('spinner')
spinner.style.display = 'none'

const searceSports = () => {
    const searceField = document.getElementById('searce-field');
    const searceText = searceField.value;
    searceField.value = '';

    const detailsSection = document.getElementById('dealils-section');
    detailsSection.innerText = '';
    if(searceText == ''){
        errorMessage1.style.display = 'block'
        errorMessage2.style.display = 'none'

    }
    else{
        errorMessage1.style.display = 'none'
        errorMessage2.style.display = 'none'
        spinner.style.display = 'block'
        // load data
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searceText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPlayer(data.teams))
            .catch(err => handleError(err))
    }
}

const handleError = err => {
    errorMessage2.style.display = 'block'
}



const displayPlayer = (players) => {
    spinner.style.display = 'none'

    const playerSection = document.getElementById('player-section')
    playerSection.innerText = '';
    players.forEach(player => {
        // console.log(player.idTeam)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="moreDetails(${player.idTeam})" class="card h-100">
                <img src="${player.strTeamBadge}" class="p-4" alt="...">
            </div>
        `
        playerSection.appendChild(div)
    });
}

const moreDetails = team => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${team}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.teams[0]))
}

const showDetails = details => {
    window.scrollTo(0,40)

    const detailsSection = document.getElementById('dealils-section');
    detailsSection.innerText = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${details.strTeamBadge}" class="card-img-top" alt="...">
            <div class="card-body">
                <h1 class="card-title text-center">Country : ${details.strCountry}</h1>
                <h2 class="card-title text-center">Team Name : ${details.strTeam}</h2>
                <p class="card-text text-center">${details.strDescriptionEN.slice(0,190)}</p>
            </div>
        </div>
    `
    detailsSection.appendChild(div)
}
