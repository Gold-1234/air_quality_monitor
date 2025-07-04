import fs from "fs"
import { getAQI } from "./getAQI.js"
import cron from "node-cron"

const task = async () => {
	const data = await getAQI()

	try {
		fs.writeFileSync(
			'./public/data.json',
			JSON.stringify(data.records),
			"utf-8"
		)
		console.log("done");
		
	} catch (error) {
		console.log(error);
	}
}

cron.schedule("* */1 * * *", task);
