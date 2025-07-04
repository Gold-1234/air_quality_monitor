import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"

function App() {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [station, setStation] = useState('');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      }
    )
  }, []);

  const getData = async ({ longitude, latitude }) => {
    const res = await axios.get('http://localhost:8000/getData', {
      params: { longitude, latitude },
    });
    const records = res.data.records;
    setStation(records[0]?.station || '');
    setData(records);
  };

  const getQuality = () => {
    getData({ longitude, latitude });
  };

  const getHistoryQuality = async () => {
     const res = await axios.get('http://localhost:8000/getHistoricalData', 
      
    );
    const records = res.data.records;
    setStation(records[0]?.station || '');
    setData(records);
    console.log(records);
    
  }

  const searchAQI = async (e) => {
    console.log(e.target.value);
    const res = await axios.get('http://localhost:8000/getData', {
      params: { 
        "filters[station]": e.target.value
      },
    });
    const records = res.data.records;

    setStation(records[0]?.station || '');
    setData(records);
  }

  return (
  <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
    <div className="p-4">
      <div className="">
        <header className="mb-6 text-center">
          <div className="w-full max-w-md mx-auto my-4">
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => searchAQI(e)}
              placeholder="Search AQI by city or pollutant"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:placeholder-gray-400"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">Air Quality Index (AQI)</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Realtime pollutant data from the nearest monitoring station
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-4">
          <div>
            <p>📍 Longitude: <span className="font-medium">{longitude}</span></p>
            <p>📍 Latitude: <span className="font-medium">{latitude}</span></p>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Button onClick={getQuality}>Get AQI</Button>
          <Button onClick={getHistoryQuality}>History</Button>
        </div>

        {station && (
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">Nearest Station: {station}</h2>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 w-screen overflow-none">
          {data
            .filter(
              (p) =>
                p.avg_value !== "NA" &&
                p.min_value !== "NA" &&
                p.max_value !== "NA" &&
                p.pollutant_id !== "NH3"
            )
            .map((pollutant, index) => (
              <div className='bg-green-700 flex flex-row m-10 justify-end w-82 rounded-2xl'>
              <Card
                key={index}
                className="w-80  dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-row justify-between"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {pollutant.pollutant_id}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-evenly">
                  
                  <p className="text-md text-gray-700 dark:text-gray-300">
                    Avg:{" "}
                    <span className="font-bold text-black dark:text-white">
                      {pollutant.avg_value}
                    </span>
                  </p>
                
                </CardContent>
              </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default App;