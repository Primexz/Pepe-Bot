const chalk = require("chalk");
module.exports = async (client, shard) => {
    console.log(`${chalk.hex("#6ac957")(`[SHARD]`)} ${chalk.bold(`Shard ${shard} resumed`)}`)
}