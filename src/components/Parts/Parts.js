import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productAxios, orderAxios } from "../../custom-axios/axios";

const Parts = (props) => {
  const [parts, setParts] = useState([]);
  const [isOrderCreated, setIsOrderCreated] = useState(false);

  const fetchParts = () => {
    return productAxios.get("/parts").then((response) => {
      setParts(response.data);
    });
  };

  useEffect(() => {
    fetchParts();
  }, [parts.length]);

  useEffect(() => {
    orderAxios.get("/checkIfOrderIsCreated").then((response) => {
      if (response.data) {
        setIsOrderCreated(true);
      } else {
        setIsOrderCreated(false);
      }
    });
  });

  const deletePhonePart = (e) => {
    productAxios.delete(`/delete/${e.target.id}`);
    setParts((parts) => {
      const partsNew = parts.filter((x) => x.id.id !== e.target.id);
      return partsNew;
    });
  };

  return (
    <div
      style={{ background: "#e7eaec", minHeight: "90vh", paddingTop: "50px" }}
    >
      <div className="container">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <div>
            <h1 style={{ fontSize: "3rem" }}>
              Phone Parts{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-phone"
                viewBox="0 0 16 16"
              >
                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </h1>
          </div>

          {props.createOrder.length > 0 ? (
            <div
              className="alert alert-danger"
              style={{ fontWeight: "bold", fontSize: "1.3rem" }}
            >
              {props.createOrder}
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="row">
            {parts.map((item) => (
              <div className="col-md-4 mb-4">
                <div
                  className="card m-auto"
                  style={{ width: "23rem", height: "20rem" }}
                  key={item.id}
                >
                  <div
                    style={{ background: "#64B6C8", height: "15%" }}
                    src="..."
                    alt="Card image cap"
                  ></div>
                  <div
                    className="card-body m-auto text-center d-flex align-items-center flex-column mt-3"
                    style={{
                      height: "auto",
                    }}
                  >
                    <h5
                      className="card-title"
                      style={{ fontSize: "2.8rem", marginBottom: "40px" }}
                    >
                      {item.phonePartName}
                    </h5>
                    <p className="card-text" style={{ fontSize: "2rem" }}>
                      {item.price.amount + " " + item.price.currency}
                    </p>
                  </div>
                  {isOrderCreated ? (
                    <div
                      className="card-footer d-flex align-items-center"
                      style={{ height: "27%" }}
                    >
                      <button
                        className="btn btn-success"
                        style={{
                          width: "76%",
                          marginRight: "4%",
                          fontSize: "1.2rem",
                        }}
                        onClick={() => {
                          let phonePart = {
                            id: item.id.id,
                            name: item.phonePartName,
                            price: item.price.amount,
                          };
                          props.addToCart(phonePart);
                        }}
                      >
                        Add to cart{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          class="bi bi-cart-plus"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ width: "20%" }}
                        onClick={deletePhonePart}
                        id={item.id.id}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          class="bi bi-trash3"
                          viewBox="0 0 16 16"
                          onClick={deletePhonePart}
                          id={item.id.id}
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <Link className="btn btn-primary p-2" to="/orders">
                        Create your order first
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parts;
