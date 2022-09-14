import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productAxios } from "../../../custom-axios/axios";
import PartFormCss from "./PartForm.css";

const PartForm = () => {
  const [phonePartName, setPhonePartName] = useState("");
  const [phonePartPrice, setPhonePartPrice] = useState(0);
  const navigate = useNavigate();

  const createPhonePart = (name, price) => {
    return productAxios
      .post("/create", null, {
        params: {
          name: name,
          price: price,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onSubmitData = (e) => {
    e.preventDefault();
    createPhonePart(phonePartName, phonePartPrice);
    navigate("/parts");
  };

  return (
    <div className="background">
      <div className="block">
        <div className="inputBlock">
          <h1 style={{ textAlign: "center" }}>Add Phone Part</h1>
          <form onSubmit={onSubmitData}>
            <div class="form-group mt-4">
              <label
                for="phonePartName"
                className="fw-bold mb-2"
                style={{ fontSize: "1.2rem" }}
              >
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="phonePartName"
                placeholder="Name..."
                onChange={(event) => setPhonePartName(event.target.value)}
              />
            </div>
            <div class="form-group mt-4">
              <label
                for="phonePartPrice"
                className="fw-bold mb-2"
                style={{ fontSize: "1.2rem" }}
              >
                Price
              </label>
              <input
                type="number"
                class="form-control"
                id="phonePartPrice"
                placeholder="Price..."
                onChange={(event) => setPhonePartPrice(event.target.value)}
              />
            </div>
            <button type="submit" class="btn btn-primary mt-4 w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartForm;
