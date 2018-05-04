var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	app.get('/notes/:id', (req, res) => {
		const details = { '_id': new ObjectID(req.params.id) };
		db.collection('notes').findOne(details, (err, item) => {
			if(err) {
				res.send({ 'error': 'an error has occurred' });
			} else {
				res.send(item);
			}
		});
	});

	app.post('/notes', (req, res) => {
		// create note:
		const note = { text: req.body.body, title: req.body.title };
		db.collection('notes').insert(note, (err, result) => {
			if(err) {
				res.send({ 'error': 'an error has occurred' });
			} else {
				res.send(result.ops[0]);
			}
		});
	});

	app.delete('/notes/:id', (req, res) => {
		const details = { '_id': new ObjectID(req.params.id) };
		db.collection('notes').remove(details, (err, item) => {
			if(err) {
				res.send({ 'error': 'an error has occurred' });
			} else {
				res.send('Note ' + req.params.id + ' deleted');
			}
		});
	});
}
