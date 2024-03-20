import React, { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
  const [photoData, setPhotoData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    let apiUrl = "";
    if (selectedDate) {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&date=${selectedDate}`;
    } else {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        setPhotoData(response.data);
      })
      .catch((error) => {
        console.error("Error download:", error);
      });
  }, [selectedDate]);

  const handleSelectedChange = (e) => {
    setSelectedDate(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  return (
    <div>
      {photoData ? (
        <>
          <input
            type="date"
            id="start"
            name="trip-start"
            onChange={handleSelectedChange}
            value={selectedDate}
          />

          <div className="photo">
            <img src={photoData.url} alt={photoData.title} />
            <h3>{photoData.title}</h3>
            <p>{photoData.explanation}</p>
            <p>{photoData.date}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default View;
