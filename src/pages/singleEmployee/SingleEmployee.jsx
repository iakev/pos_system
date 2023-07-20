import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TOKEN } from "../../../token";

const SingleEmployee = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `http://52.6.84.250/api/v1/employees/${id}`;
      const headers = {
        Authorization: `Token  ${TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const result = await response.json();

      setEmployee(result);
    };

    fetchProduct();
  }, []);

  const { user, phone_number, address, department } = employee;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {employee ? (
          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">
                    <span>{user?.first_name}</span>{" "}
                    <span>{user?.last_name}</span>
                  </h1>
                  <div className="detailItem">
                    <span className="itemKey">Phone NUmber:</span>
                    <span className="itemValue">{phone_number}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Department:</span>
                    <span className="itemValue">{department}</span>
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

export default SingleEmployee;
