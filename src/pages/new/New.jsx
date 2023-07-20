/* eslint-disable react/prop-types */
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { TOKEN } from "../../../token";
import { useLocation } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [formValues, setFormValues] = useState({});
  const [test, setTest] = useState({});

  const location = useLocation();
  const currentURL = location.pathname;

  // console.log({ currentURL });

  const handleInputChange = (event, inputId) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [inputId]: event.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({ formValues });

    if (currentURL === "/employees/new") {
      const convertedObject = Object.keys(formValues).reduce((acc, key) => {
        const input = inputs.find((input) => input.id === parseInt(key));
        if (input) {
          acc[input.name] = formValues[key];
        }
        return acc;
      }, {});
      console.log({ convertedObject });
      const employee = {
        phone_number: convertedObject.phone_number,
        address: convertedObject.address,
        email_address: convertedObject.email_address,
        department: convertedObject.department,
        user: {
          username: convertedObject.username,
          password: convertedObject.password,
          first_name: convertedObject.first_name,
          last_name: convertedObject.last_name,
        },
      };

      const stringified = JSON.stringify(employee);
      console.log({ stringified });

      const url = "http://52.6.84.250/api/v1/employees";
      const headers = {
        Authorization: `Token  ${TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: stringified,
      });

      const result = await response.json();
      console.log({ result });
    } else if (currentURL === "/products/new") {
      const convertedObject = Object.keys(formValues).reduce((acc, key) => {
        const input = inputs.find((input) => input.id === parseInt(key));
        if (input) {
          acc[input.name] = formValues[key];
        }
        return acc;
      }, {});

      convertedObject.category = "de7fdf7c-1ea7-4db6-a98c-15bd367f1f96";
      console.log({ convertedObject });

      setTest(convertedObject);
      console.log({ test });
      const stringified = JSON.stringify(test);
      console.log({ stringified });

      const url = "http://52.6.84.250/api/v1/products";
      const headers = {
        Authorization: `Token  ${TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: stringified,
      });

      const result = await response.json();
      console.log({ result });
    } else if (currentURL === "/suppliers/new") {
      const convertedObject = Object.keys(formValues).reduce((acc, key) => {
        const input = inputs.find((input) => input.id === parseInt(key));
        if (input) {
          acc[input.name] = formValues[key];
        }
        return acc;
      }, {});

      console.log({ convertedObject });

      const supplier = {
        ...convertedObject,
        products: [],
      };

      const stringified = JSON.stringify(supplier);
      console.log({ stringified });

      const url = "http://127.0.0.1:8000/api/v1/suppliers/";
      const headers = {
        Authorization: `Token  ${TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: stringified,
      });

      const result = await response.json();
      console.log({ result });
    }

    setFormValues({});
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleFormSubmit}>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    value={formValues[input.id] || ""}
                    onChange={(event) =>
                      handleInputChange(event, input.id, input.name)
                    }
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
