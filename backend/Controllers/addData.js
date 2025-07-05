import formatData from "../utils/formatData.js";
import getAQI from "../utils/getAQI.js";
import supabase from "../db/supabaseClient.js";
import dayjs from "dayjs";

const insertAQIrecords = async ( req, res ) => {
	const records = await getAQI();
	const formattedData = formatData(records);

	// console.log(formattedData[0]);
	
	// return res.json(formattedData);	
	try {
		const { data, error } = await supabase.from('aqi_records').upsert(
			formattedData,
			{
				onConflict : [ 'station', 'pollutant_id', 'last_update' ]
			}
		)
		if(error){
			console.log("error", JSON.stringify(error));
			return res.json(error)
		} else {
			console.log(data);
			return res.json(data);	
		}
	} catch (error) {
		console.log(error);
		
	}
}

export default insertAQIrecords