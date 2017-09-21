import Database from 'react-native-local-mongodb';
import {promisify} from 'bluebird';

const db = new Database({
  autoload: true,
});

db.insert = promisify(db.insert);
db.find = promisify(db.find);
db.findOne = promisify(db.findOne);

export default db;
