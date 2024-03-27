import React, { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
  const [photoData, setPhotoData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => {
    let apiUrl = "";
    if (startDate && endDate) {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&start_date=${startDate}&end_date=${endDate}`;
    } else if (selectedDate) {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&date=${selectedDate}`;
    }
    // else if (count) {
    //   apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&count=${count}`;
    // }
    else {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ`;
    }

    if (count) {
      apiUrl += `&count=${count}`;
    }
    axios
      .get(apiUrl, {
        mode: "corse",
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        setPhotoData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error download:", error);
      });
  }, [selectedDate, startDate, endDate, count]);

  const handleSelectedChange = (e) => {
    setSelectedDate(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  return (
    <div className="container">
      <div className="inputs-container">
        <label>Podaj datę</label>
        <input
          type="date"
          id="start"
          name="trip-start"
          onChange={handleSelectedChange}
          value={selectedDate}
        />
        <label>Podaj pierwszą datę z zakresu</label>
        <input
          type="date"
          id="startDate"
          name="trip-start"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          // max={endDate}
        />
        <label>Podaj drugą datę z zakresu</label>
        <input
          type="date"
          id="endDate"
          name="trip-start"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
        <button id="randome" onClick={() => setCount("10")}>
          Randome
        </button>
      </div>
      console.log(setCount)
      {photoData ? (
        Array.isArray(photoData) ? (
          <>
            {console.log("Object is an array")}
            {photoData.map((item, index) => (
              <div key={index} className="photo2">
                <img src={item.url} alt={item.title} />
                <h2>{item.title}</h2>
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
