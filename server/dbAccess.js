const ADODB = require("node-adodb");

const accessPath = "C:\\database\\後端server2000.mdb";
const adodb = ADODB.open(
  `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${accessPath};`,
);

module.exports = adodb;
