import React, { useState, useEffect } from "react";

const AqiPage = () => {
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "c9480d5f-d68a-4b55-b116-fec97480b7cd"; // Replace with your API Key

  useEffect(() => {
    const fetchAqi = async () => {
      try {
        // Fetch nearest city AQI based on IP
        const response = await fetch(`https://api.airvisual.com/v2/nearest_city?key=${apiKey}`);
        const data = await response.json();

        if (data.status === "success") {
            
          setAqiData(data.data);
        } else {
          setError("Failed to fetch AQI data.");
        }
      } catch (err) {
        setError("Error fetching AQI data.");
      }
    };

    fetchAqi();
  }, []);

  return (
    <div className="aqi-page">
      <h1>Air Quality Index (AQI)</h1>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : aqiData ? (
        <div>
          <h2>{aqiData.city}, {aqiData.country}</h2>
          <p><strong>AQI:</strong> {aqiData.current.pollution.aqius}</p>
          <p><strong>Temperature:</strong> {aqiData.current.weather.tp}°C</p>
          <p><strong>Humidity:</strong> {aqiData.current.weather.hu}%</p>
          <p><strong>Wind Speed:</strong> {aqiData.current.weather.ws} m/s</p>
        </div>
      ) : (
        <p>Loading AQI data...</p>
      )}
    </div>
  );
};

export default AqiPage;

// import React, { useState, useEffect } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// const AqiPage = () => {
//   const [userAqi, setUserAqi] = useState(null);
//   const [cityAqi, setCityAqi] = useState([]);
//   const [historicalData, setHistoricalData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiKey = "c9480d5f-d68a-4b55-b116-fec97480b7cd";
//   const majorCities = ["Delhi", "Beijing", "Los Angeles", "London", "Paris", "Tokyo", "Kathmandu"];

//   // Fetch AQI for User's Location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const { latitude, longitude } = position.coords;
//       try {
//         const response = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${apiKey}`);
//         const data = await response.json();
//         if (data.status === "success") {
//           setUserAqi({ city: data.data.city, aqi: data.data.current.pollution.aqius });
//         }
//       } catch (err) {
//         setError("Error fetching user's AQI.");
//       }
//     });
//   }, []);

//   // Fetch AQI for Major Cities
//   useEffect(() => {
//     const fetchCitiesAqi = async () => {
//       try {
//         const results = await Promise.all(
//           majorCities.map(async (city) => {
//             const response = await fetch(`https://api.airvisual.com/v2/city?city=${city}&country=USA&key=${apiKey}`);
//             const data = await response.json();
//             return data.status === "success" ? { city, aqi: data.data.current.pollution.aqius } : null;
//           })
//         );
//         setCityAqi(results.filter(Boolean));
//       } catch (err) {
//         setError("Error fetching AQI for major cities.");
//       }
//     };
//     fetchCitiesAqi();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen text-center">
//       <h1 className="text-3xl font-bold mb-6">🌍 Air Quality Index (AQI)</h1>

//       {/* User's Location AQI */}
//       <div className="bg-white shadow-lg p-6 rounded-xl mb-6">
//         <h2 className="text-xl font-semibold">📍 Your Location AQI</h2>
//         {userAqi ? (
//           <p className="text-2xl font-bold mt-2">{userAqi.city}: {userAqi.aqi}</p>
//         ) : (
//           <p>Loading your AQI...</p>
//         )}
//       </div>

//       {/* Major Cities AQI */}
//       <div className="bg-white shadow-lg p-6 rounded-xl">
//         <h2 className="text-xl font-semibold">🏙️ Major Cities AQI</h2>
//         {cityAqi.length > 0 ? (
//           <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//             {cityAqi.map((city) => (
//               <li key={city.city} className="p-4 rounded-lg" style={{ backgroundColor: getAqiColor(city.aqi) }}>
//                 <p className="font-medium">{city.city}: <span className="font-bold">{city.aqi}</span></p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Loading city AQI...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// // Function to determine AQI color based on value
// const getAqiColor = (aqi) => {
//   if (aqi <= 50) return "#00E400"; // Good (Green)
//   if (aqi <= 100) return "#FFFF00"; // Moderate (Yellow)
//   if (aqi <= 150) return "#FF7E00"; // Unhealthy for Sensitive Groups (Orange)
//   if (aqi <= 200) return "#FF0000"; // Unhealthy (Red)
//   if (aqi <= 300) return "#8F3F97"; // Very Unhealthy (Purple)
//   return "#7E0023"; // Hazardous (Maroon)
// };

// export default AqiPage;