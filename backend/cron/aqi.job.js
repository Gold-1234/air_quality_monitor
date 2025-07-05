import cron from "node-cron"
import insertAQIrecords from "../Controllers/addData";

cron.schedule("1 * * * *", async () => {
	try {
		const count = await insertAQIrecords();
		console.log(`Inserted ${ count } records.`);
		
	} catch (error) {
		console.log(error);
	}
})