import React, { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ`
      )
      .then((response) => {
        setPhotoData(response.data);
      })
      .catch((error) => {
        console.error("Error download:", error);
      });
  }, []);

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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default View;
