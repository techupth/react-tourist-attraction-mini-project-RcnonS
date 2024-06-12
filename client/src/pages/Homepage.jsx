import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import linkIcon from "/src/svg/link_icon.svg";

function Homepage() {
  const [attraction, setAttraction] = useState([]);
  const [searchAttraction, setSearchAttraction] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(null);

  const navigate = useNavigate();

  const LimitedChar = ({ text, limit }) => {
    const limitedText = text.length >= limit ? text.slice(0, limit) : text;

    return (
      <p className="description">
        {limitedText} <span className="dotContinueRead">...</span>
      </p>
    );
  };

  const getAttraction = async (search) => {
    try {
      setLoadingStatus("loading");
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${search}`
      );
      setLoadingStatus("completed");
      setAttraction(result.data.data);
    } catch (error) {
      setLoadingStatus("failed");
      console.error(error);
    }
  };

  useEffect(() => {
    getAttraction(searchAttraction);
  }, [searchAttraction]);

  return (
    <div className="homepage">
      <h1 className="pageTitle">เที่ยวไหนดี</h1>
      <div className="searchLocation">
        <p className="searchTitle">ค้นหาที่เที่ยว</p>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className="searchInput"
          value={searchAttraction}
          onChange={(event) => {
            setSearchAttraction(event.target.value);
          }}
        />
      </div>
      {loadingStatus === "loading" && <h1>Loading...</h1>}
      {loadingStatus === "failed" && <h1>Fail to load data...</h1>}
      {loadingStatus === "completed" &&
        attraction.length &&
        attraction.map((item) => {
          return (
            <div className="attractionList" key={item.eid}>
              <div className="bigImage">
                <img
                  src={item.photos[0]}
                  alt=""
                  className="bigAttractionImage"
                />
              </div>
              <div className="attractionInfo">
                <h1
                  className="title"
                  onClick={() => {
                    navigate(window.open(`${item.url}`));
                  }}
                >
                  {item.title}
                </h1>
                <LimitedChar text={item.description} limit={100} />
                <p
                  className="continueRead"
                  onClick={() => {
                    navigate(window.open(`${item.url}`));
                  }}
                >
                  อ่านต่อ
                </p>
                <p className="catagories">
                  หมวด{" "}
                  <span
                    className="eachCatagories"
                    onClick={() => {
                      setSearchAttraction(item.tags[0]);
                    }}
                  >
                    {item.tags[0]}
                  </span>
                  <span
                    className="eachCatagories"
                    onClick={() => {
                      setSearchAttraction(item.tags[1]);
                    }}
                  >
                    {item.tags[1]}
                  </span>
                  <span
                    className="eachCatagories"
                    onClick={() => {
                      setSearchAttraction(item.tags[2]);
                    }}
                  >
                    {item.tags[2]}
                  </span>
                  <span
                    className="eachCatagories"
                    onClick={() => {
                      setSearchAttraction(item.tags[3]);
                    }}
                  >
                    {item.tags[3]}
                  </span>
                  และ{" "}
                  <span
                    className="eachCatagories"
                    onClick={() => {
                      setSearchAttraction(item.tags[4]);
                    }}
                  >
                    {item.tags[4]}
                  </span>
                </p>
                <div className="smallImage">
                  <img
                    src={item.photos[1]}
                    alt=""
                    className="smallAttractionImage"
                  />
                  <img
                    src={item.photos[2]}
                    alt=""
                    className="smallAttractionImage"
                  />
                  <img
                    src={item.photos[3]}
                    alt=""
                    className="smallAttractionImage"
                  />
                </div>
                <div className="copyLinkTag">
                  <img
                    src={linkIcon}
                    alt=""
                    className="copyLink"
                    onClick={() => {
                      navigator.clipboard.writeText(item.url);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Homepage;
