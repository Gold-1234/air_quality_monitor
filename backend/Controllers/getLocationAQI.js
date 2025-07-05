import axios from "axios";
import getClosestStation from "../utils/getClosestStation.js";
import cron from "node-cron";
import fs from "fs"


export const getLocationAQI = async ( req, res ) => {
	console.log("getting aqi");
	
	const { longitude, latitude } = req.query;
	if (!longitude || !latitude) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  	}
	console.log(longitude, latitude);
	
	
	const closestStation = await getClosestStation( longitude, latitude );

	console.log("closestStation", closestStation);
	
	const data = await axios.get(`https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=${process.env.CPCB_API_KEY}&format=json`, 
		{
			headers: {
				  'accept': 'application/json'
			},
			params: {
				limit: 4000,
				"filters[station]" : closestStation.station
			},
			
		}
	)

	if(!data){
		return res.status(400).json("no data")
	}
	// console.log(data.data);
	console.log("aqi", data.data.records[0]);
	
	return res.status(200).json(data.data.records)
}


