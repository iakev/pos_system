import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TOKEN } from "../../../token";

const Business = () => {
  const [business, setBusiness] = useState({});

  useEffect(() => {
    const fetchBusiness = async () => {
      const url = `http://127.0.0.1:8000/api/v1/business/`;
      const headers = {
        Authorization: `Token  ${TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const result = await response.json();
      const [mainBusiness] = result;

      setBusiness(mainBusiness);
    };

    fetchBusiness();
  }, []);

  const { name, address, phone_number, email_address, owner } = business;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {business ? (
          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Phone Number:</span>
                    <span className="itemValue">{phone_number}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Email Address:</span>
                    <span className="itemValue">{email_address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Owner:</span>
                    <span>{owner?.first_name}</span>{" "}
                    <span>{owner?.last_name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Business;
