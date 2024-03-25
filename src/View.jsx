import React, { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
  const [photoData, setPhotoData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    let apiUrl = "";
    if (startDate && endDate) {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&start_date=${startDate}&end_date=${endDate}`;
    } else if (selectedDate) {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&date=${selectedDate}`;
    } else {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        setPhotoData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error download:", error);
      });
  }, [selectedDate, startDate, endDate]);

  const handleSelectedChange = (e) => {
    setSelectedDate(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  return (
    <div>
      <input
        type="date"
        id="start"
        name="trip-start"
        onChange={handleSelectedChange}
        value={selectedDate}
      />
      <input
        type="date"
        id="startDate"
        name="trip-start"
        onChange={(e) => setStartDate(e.target.value)}
        value={startDate}
        // max={endDate}
      />
      <input
        type="date"
        id="endDate"
        name="trip-start"
        onChange={(e) => setEndDate(e.target.value)}
        value={endDate}
      />
      {photoData ? (
        Array.isArray(photoData) ? (
          <>
            {console.log("Object is an array")}
            {photoData.map((item, index) => (
              <div key={index} className="photo2">
                <img src={item.url} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.explanation}</p>
                <p>{item.date}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            {console.log("Object is not an array")}
            <div className="photo">
              <img src={photoData.url} alt={photoData.title} />
              <h3>{photoData.title}</h3>
              <p>{photoData.explanation}</p>
              <p>{photoData.date}</p>
            </div>
          </>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default View;
