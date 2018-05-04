module.exports = function(app, db) {
	app.post('/notes', (req, res) => {
		// create note:
		console.log(req.body);
		res.send("A note was created!");
	});
}
