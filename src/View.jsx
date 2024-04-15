import React, { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
  const [photoData, setPhotoData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState(null);
  const maxDate = getMaxDate();

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

  function getMaxDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${year}-${month}-${day}`;
  }

  function resetAllElements() {
    setSelectedDate("");
    setStartDate("");
    setEndDate("");
    setCount("");
  }

  const handleSelectedChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleButtonClick = () => {
    // resetAllElements();
    setCount("1");
  };

  const handleStartDateInput = (e) => {
    // resetAllElements();

    setStartDate(e.target.value);
  };

  const handleEndDateInput = (e) => {
    setEndDate(e.target.value);
  };

  const handleDataReset = () => {
    resetAllElements();
  };

  return (
    <div className="container">
      <div className="inputs-container">
        <label>
          Show Photo from date:
          <input
            type="date"
            id="start"
            name="trip-start"
            onChange={handleSelectedChange}
            value={selectedDate}
            max={maxDate}
          />
        </label>

        <label>
          First Date of range
          <div>
            <input
              type="date"
              id="startDate"
              name="trip-start"
              onChange={handleStartDateInput}
              value={startDate}
              max={maxDate}
              required
            />
            <span className="validity"></span>
          </div>
        </label>

        <label>
          Second Date of range
          <div>
            <input
              type="date"
              id="endDate"
              name="trip-start"
              onChange={handleEndDateInput}
              value={endDate}
              max={maxDate}
              required
            />
            <span className="validity-2"></span>
          </div>
        </label>

        <div className="buttons-container">
          <button id="randome" onClick={handleButtonClick} value={count}>
            Randome
          </button>

          <button id="reset" onClick={handleDataReset}>
            Reset Photos
          </button>
        </div>
      </div>

      {photoData ? (
        Array.isArray(photoData) ? (
          <>
            {console.log("Object is an array")}
            {photoData.map((item, index) => (
              <div key={index} className="photo2">
                <h3>{item.title}</h3>
                <img src={item.url} alt={item.title} />
                <p>{item.explanation}</p>
                <p>{item.date}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            {console.log("Object is not an array")}
            <div className="photo">
              <h3>{photoData.title}</h3>
              <img src={photoData.url} alt={photoData.title} />
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
