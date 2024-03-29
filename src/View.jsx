import React, { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
  const [photoData, setPhotoData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState(null);

  useEffect(() => {
    let apiUrl = "";
    if (count) {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&count=${count}`;
    } else if (startDate && endDate) {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&start_date=${startDate}&end_date=${endDate}`;
    } else if (selectedDate) {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&date=${selectedDate}`;
    } else {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ`;
    }

    axios
      .get(apiUrl, {
        mode: "cors",
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
    setStartDate("");
    setEndDate("");
    // console.log("e.target.value", e.target.value);
  };

  const handleButtonClick = () => {
    setSelectedDate("");
    setStartDate("");
    setEndDate("");
    setCount("1");
  };

  const handleStartDateInput = (e) => {
    setSelectedDate("");
    setCount("");
    setStartDate(e.target.value);
  };

  const handleEndDateInput = (e) => {
    setSelectedDate("");
    setCount("");

    setEndDate(e.target.value);
  };

  const handleDataReset = () => {
    setSelectedDate("");
    setStartDate("");
    setEndDate("");
    setCount("");
  };

  return (
    <div className="container">
      <div className="inputs-container">
        <label>Show Photo from date:</label>
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
          onChange={handleStartDateInput}
          value={startDate}
        />

        <label>Podaj drugą datę z zakresu</label>
        <input
          type="date"
          id="endDate"
          name="trip-start"
          onChange={handleEndDateInput}
          value={endDate}
          // max={endDate};
        />

        <button id="randome" onClick={handleButtonClick} value={count}>
          Randome
        </button>
      </div>

      <button id="reset" onClick={handleDataReset}>
        Reset Photos
      </button>

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
