const API_KEY = "7a377f8c26124572a8c7cd1fcc269650";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ALLTEAMS = 'competitions/2021/teams';
const ALLMATCHES = 'competitions/2021/matches?matchday=1'

var fetchAPI = function (url) {
	return fetch(url, {
		'headers': {
			'X-Auth-Token': API_KEY
		}
	})
	.then(status)
    .then(json)
    .then(https)
}

const status = function (response) {
	if (response.status !== 200) {
		console.log("Error : " + response.status);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

const json = function (response) {
	return response.json();
}

const error = function (error) {
	console.log("Error : " + error);
}

const https = function (response) {
	var str = JSON.stringify(response).replace(/http:/g, 'https:');
	return JSON.parse(str);
}

function getAllStandings() {
    if ("caches" in window) {
    	caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("homeStandings");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <div class="card hoverable" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                <table class="centered striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>Won</th>
                            <th>Draw</th>
                            <th>Lost</th>
                            <th>Points</th>
                            <th>Goals For</th>
                            <th>Goals Against</th>
                            <th>Goal Difference</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

function getAllTeams() {
	fetchAPI(BASE_URL + ALLTEAMS)
		.then(function (data) {
			console.log(data);
			var listTeam = ''
			data.teams.forEach(team => {
				listTeam += `
					<div class="card horizontal hoverable">
						<div class="card-image center">
							<img src='${team.crestUrl}' height='197' width='192'>
						</div>
						<div class="card-stacked">
							<div class="card-content">
								<h6>Team Name : ${team.name}</h6>
								<h6>TLA : ${team.tla}</h6>
								<h6>Address : ${team.address}</h6>
								<h6>Phone : ${team.phone}</h6>
								<h6>Website : ${team.website}</h6>
								<h6>Email : ${team.email}</h6>
								<h6>Club Colors : ${team.clubColors}</h6>
								<h6>Venue : ${team.venue}</v6>
							</div>
							<div class="card-action">
								<a class="btn green btn-floating pulse" onclick="save(this);" dtTeam='${JSON.stringify(team)}'><i class="material-icons">save</i></a>
							</div>
						</div>
					</div>
				`
			});
			document.getElementById("homeTeams").innerHTML = listTeam
		})
		.catch(error);
}

function getAllMatches() {
	fetchAPI(BASE_URL + ALLMATCHES)
		.then(function (data) {
			console.log(data);
			var listMatches = ''
			data.matches.forEach(match => {
				listMatches +=`
					<div class="card-panel blue-grey hoverable">
						<h4 class="center white-text">${match.homeTeam.name}</h4> <h4 class="center white-text">VS</h4> <h4 class="center white-text">${match.awayTeam.name}</h4>
							<span class="white-text">Date : ${match.season.startDate}</span> <span class="white-text"/</span> <span class="white-text">${match.season.endDate}</span>
							<p class="white-text">utc Date : ${match.utcDate}</p>
							<p class="white-text">Status : ${match.status}</p>
							<span class="white-text">Score : ${match.score.fullTime.homeTeam}</span> - <span class="white-text">${match.score.fullTime.awayTeam}</span>
					</div>
				`
			});
			document.getElementById("homeMatches").innerHTML = listMatches
		})
		.catch(error);
}

function saveTeams() {
	getSaveTeams()
		.then(function (data) {
			var saveTeam = ''
			data.forEach(team => {
				saveTeam += `
					<div class="card horizontal hoverable">
						<div class="card-image center">
							<img src='${team.crestUrl}' height='197' width='192'>
						</div>
						<div class="card-stacked">
							<div class="card-content">
								<h6>Team Name : ${team.name}</h6>
								<h6>TLA : ${team.tla}</h6>
								<h6>Address : ${team.address}</h6>
								<h6>Phone : ${team.phone}</h6>
								<h6>Website : ${team.website}</h6>
								<h6>Email : ${team.email}</h6>
								<h6>Club Colors : ${team.clubColors}</h6>
								<h6>Venue : ${team.venue}</v6>
							</div>
							<div class="card-action">
								<a class="btn red btn-floating pulse" onclick="deleteTeam(this);" dtTeam='${JSON.stringify(team)}'><i class="material-icons">delete</i></a>
							</div>
						</div>
					</div>
				`
			});
			document.getElementById("Tim").innerHTML = saveTeam;
		})
}

function save(data) {
	var team = JSON.parse(data.getAttribute('dtTeam'))
	addTeam(team);
}

function deleteTeam(data) {
	var team = JSON.parse(data.getAttribute('dtTeam'))
	deleteSavedTeam(team);
}