import axios from "axios";
const getAQI = async ( req, res ) => {
	console.log("getting aqi");
	
	const data = await axios.get(`https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=${process.env.CPCB_API_KEY}&format=json`, 
		{
			headers: {
				  'accept': 'application/json'
			},
			params: {
				limit: 5000
			},
			
		}
	)

	if(!data){
		// return res.status(400).json("no data")

		console.log("no data");
		
	}
	console.log("aqi", data.data.records[0]);
	
	return data.data.records
}

export default getAQI;