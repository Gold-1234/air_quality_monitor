import cron from "node-cron";

const arr = [
	{
		"id": 1,
		"name": "name1",
		"date": "2024-05-16T10:32:40.2822"
	},
	{
		"id": 2,
		"name": "name2",
		"date": "2024-05-16T10:32:40.2822"
	},
	{
		"id": 3,
		"name": "name3",
		"date": "2024-04-16T10:32:40.2822"
	},
	{
		"id": 4,
		"name": "name4",
		"date": "2025-03-16T10:32:40.2822"
	}
]

const val = 
	arr.splice(arr.findIndex((e) => e.id > 2))


console.log("val", val);


const task = () => {
	console.log("Running a scheduled task", new Date());
}

cron.schedule("* * * * *", task);

 