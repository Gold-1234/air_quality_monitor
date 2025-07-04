const deg2rad = (deg) => (deg * Math.PI) / 180.0;
const rad2deg = (rad) => (rad * 180.0) / Math.PI;

function getDistanceBetweenPointsNew(latitude1, longitude1, latitude2, longitude2, unit = 'Km') {
    const theta = longitude1 - longitude2;
    let distance = Math.sin(deg2rad(latitude1)) * Math.sin(deg2rad(latitude2)) + Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) * Math.cos(deg2rad(theta));

      distance = Math.acos(distance); 
      distance = rad2deg(distance); 
      distance = distance * 60 * 1.1515;

      distance = distance * 1.609344; 
    

    return (Math.round(distance,2)); 
}

export default getDistanceBetweenPointsNew