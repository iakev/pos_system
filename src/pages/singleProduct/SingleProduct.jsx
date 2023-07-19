import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TOKEN } from "../../../token";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `http://127.0.0.1:8000/api/v1/products/${id}`;
      const headers = {
        Authorization: `Token  ${TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const result = await response.json();

      setProduct(result);
    };

    fetchProduct();
  }, []);

  const {
    name,
    category,
    active_for_sale,
    description,
    packaging_unit,
    limited,
    tax_type,
    unit,
  } = product;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {product ? (
          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <span className="itemValue">{description}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Active for sale:</span>
                    {active_for_sale ? (
                      <span className="itemValue">True</span>
                    ) : (
                      <span className="itemValue">False</span>
                    )}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Category:</span>
                    <span className="itemValue">{category}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Packaging Unit:</span>
                    <span className="itemValue">{packaging_unit}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Limited:</span>
                    {limited ? (
                      <span className="itemValue">True</span>
                    ) : (
                      <span className="itemValue">False</span>
                    )}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Tax Type:</span>
                    <span className="itemValue">{tax_type}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Unit:</span>
                    <span className="itemValue">{unit}</span>
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

export default SingleProduct;
