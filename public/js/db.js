const database = idb.open('ofutebol',1,function(upgrade) {
	upgrade.createObjectStore('teams', {'keyPath': 'id'})
});

var addTeam = function(team) {
	database.then(function(db) {
		var tx = db.transaction('teams', 'readwrite');
		var store = tx.objectStore('teams')
		store.put(team)
		return tx.complete;
	})
	.then(function() {
		M.toast({html: `${team.name} Team saved successfully`, classes: 'rounded'})
	})
	.catch(function(err) {
		console.log('Error : ', err);
	})
}

function getSaveTeams() {
	return database.then(function(db) {
		var tx = db.transaction('teams', 'readonly');
		var store = tx.objectStore('teams');
		return store.getAll();
	})
}

function deleteSavedTeam(team) {
	database.then(function(db) {
		var tx = db.transaction('teams', 'readwrite');
		var store = tx.objectStore('teams');
		store.delete(team.id)
	})
	.then(function() {
		M.toast({html: `${team.name} Team successfully deleted`, classes: 'rounded'})
		saveTeams()
	})
	.catch(function(err) {
		console.log('Error : ', err);
	})
}