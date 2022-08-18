const express = require('express');
const app = express();
const port = process.env.PORT || 3009;
const GoalModel = require('./models/goal');
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
app.set('json spaces', 2);

const getGoalDb = async () => {
	return await GoalModel.find().lean();
};

const setGoalDb = async (data) => {
	let data_db = [];

	data_db.push({
		updateOne: {
			filter: { user: data.user },
			update: {
				$set: { data }
			},
			upsert: true // <<==== upsert in every document
		}
	});
	try {
		await GoalModel.collection.bulkWrite(data);
	} catch (err) {
		console.log('db error:', err);
	}
	console.log('write to db', data);
};

app.get('/', async (req, res) => {
	// res.send("Hello World!");
	const data = await getGoalDb();
	// res.json(data);
	try {
		res.json(data);
		// res.send('Hello World!');
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
});

app.get('/:id', async (req, res) => {
	try {
		const goals = await GoalModel.find({});
		res.json(goals);
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
	setGoalDb({ user: 'abc', goal_desc: 'aksjdgas' });
});
