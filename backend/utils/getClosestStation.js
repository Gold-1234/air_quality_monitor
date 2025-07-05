import { stations } from "../public/stations.js";
import getDistanceBetweenPointsNew from "./getDistance.js";

const getClosestStation = async ( userLongitude, userLatitude ) => {
	console.log('getting closest station');
	
	console.log(userLatitude, userLongitude);
	
	const distances = []

	if(stations){
		
		stations.map((currentStation) => {
			const { station, latitude, longitude } = currentStation;

			const dist = getDistanceBetweenPointsNew(userLatitude, userLongitude, parseFloat(latitude), parseFloat(longitude) )
			
			distances.push({ station, dist })
		})
	}

	const min = distances.reduce((acc, curr) => {
		return curr.dist < acc.dist ? curr : acc;
	}, { dist: Number.MAX_VALUE })

	return min

}

// const userLatitude = 22.5
// const userLongitude = 88.33
// const result = getClosestStation({userLatitude, userLongitude})
// console.log(result);

export default getClosestStation