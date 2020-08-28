var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const deviceSchema = new Schema({
  device_type: String
});

const familyMemberSchema = new Schema({
  gqlid: mongoose.Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  devices: Array
});

const Device = mongoose.model('Device', deviceSchema);
const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);

module.exports = { Device, FamilyMember };
