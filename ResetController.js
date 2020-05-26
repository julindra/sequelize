const fs = require('fs');
const seeders = fs.readdirSync('./seeders').map(s => require(`../seeders/${s}`));
const { sequelize, Sequelize } = require('../models');

class ResetController {
 	static async reset(req, res) {
		try {
			for(const model in sequelize.models) {
				await sequelize.models[model].truncate({ cascade: true, restartIdentity: true });
			}
	
			for(const seeder of seeders) {
				await seeder.up(sequelize.getQueryInterface(), Sequelize);
			}

			res.send('success');
		} catch(err) {
			res.send(err);
		}
	}
}

module.exports = ResetController;