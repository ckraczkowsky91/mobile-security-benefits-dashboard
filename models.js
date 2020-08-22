var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const familyMemberSchema = new Schema({
  id: String,
  first_name: String,
  last_name: String
});

module.exports = mongoose.model('FamilyMember', familyMemberSchema);
