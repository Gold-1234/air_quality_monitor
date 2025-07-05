import dayjs from "dayjs";

const formatData = ( records ) => {
	return records.map((r) => ({
		country: r.country,
		state: r.state,
		city: r.city,
		station: r.station,
		pollutant_id: r.pollutant_id,
		last_update: new Date(dayjs(r.last_update).toISOString()),
		latitude: parseFloat(r.latitude),
		longitude: parseFloat(r.longitude),
		min_value: parseFloat(r.min_value),
		max_value: parseFloat(r.max_value),
		avg_value: parseFloat(r.avg_value),
	}))
}

export default formatData;