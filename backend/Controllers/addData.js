import formatData from "../utils/formatData.js";
import getAQI from "../utils/getAQI.js";
import supabase from "../db/supabaseClient.js";

const insertAQIrecords = async () => {
	const records = await getAQI();
	const formattedData = formatData(records);
	console.log(formattedData[0]);
	
	try {
		const { data, error } = await supabase.from('aqi_records').upsert(
			formattedData,
			{
				onConflict : [ 'station', 'pollutant_id', 'last_update' ],
				returning: 'representation'
			}
		)
		if(error){
			console.log("Supabase error : ", JSON.stringify(error));
			throw error;
		} else {
			console.log("data", data);
			return data?.length
		}
	} catch (error) {
		console.log(error);
		
	}
}

export default insertAQIrecords