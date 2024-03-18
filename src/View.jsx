import React, { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
  const [photoData, setPhotoData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const apiUrl = selectedDate
      ? `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&date=${selectedDate}` // przekazuje &date=${selectedDate}
      : `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ`;
    axios
      .get(apiUrl)
      .then((response) => {
        setPhotoData(response.data);
        console.log("response.data", response.data);
      })
      .catch((error) => {
        console.error("Error download:", error);
      });
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      {photoData ? (
        <>
          <h2>{photoData.title}</h2>
          <img src={photoData.url} alt={photoData.title} />
          <p className="explanation-inform">
            {photoData.explanation}
            {photoData.date}
          </p>
          <p className="date-inform">{photoData.date}</p>

          <input
            type="date"
            id="start"
            name="trip-start"
            onChange={handleDateChange}
            value={selectedDate}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default View;
