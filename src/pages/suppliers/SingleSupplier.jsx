import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TOKEN } from "../../../token";

const SingleSupplier = () => {
  const [supplier, setSupplier] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `http://127.0.0.1:8000/api/v1/suppliers/${id}`;
      const headers = {
        Authorization: `Token  ${TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const result = await response.json();

      setSupplier(result);
    };

    fetchProduct();
  }, []);

  const { name, address, email_address, phone_number, products } = supplier;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {supplier ? (
          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Active for sale:</span>
                    {products?.length ? (
                      <span className="itemValue">True</span>
                    ) : (
                      <span className="itemValue">False</span>
                    )}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Email Address:</span>
                    <span className="itemValue">{email_address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone Number:</span>
                    <span className="itemValue">{phone_number}</span>
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

export default SingleSupplier;
