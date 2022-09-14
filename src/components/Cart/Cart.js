import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderAxios } from "../../custom-axios/axios";

const Cart = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    changeTotalPrice();
  });

  useEffect(() => {
    fetchOrderItems();
  }, [cartItems.length]);

  const fetchOrderItems = () => {
    orderAxios
      .get("/getOrderItems")
      .then((response) => setCartItems(response.data));
  };

  const changeTotalPrice = () => {
    let price = 0;
    let currency = "MKD";
    cartItems.map((item) => {
      price += item.price.amount;
    });
    setTotalPrice(price);
    setCurrency(currency);
  };

  const deleteFromCart = (e) => {
    orderAxios.post("/deleteOrderItem/", null, {
      params: {
        id: e.target.id,
      },
    });
    setCartItems((cartItems) => {
      const newCartItems = cartItems.filter((x) => x.id !== e.target.id);
      if (newCartItems.length == undefined) {
        setIsEmpty(true);
      } else {
        return newCartItems;
      }
    });
  };

  const placeOrder = () => {
    orderAxios.post("/placeOrder");
    navigate("/orders");
  };

  return (
    <div
      style={{ background: "#f5f6f7", minHeight: "90vh", paddingTop: "50px" }}
    >
      {isEmpty ? (
        <div
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Cart empty.
        </div>
      ) : (
        <div className="container">
          <h1 style={{ fontSize: "3rem" }}>Cart</h1>
          <table class="table">
            <thead style={{ fontSize: "1.3rem" }}>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "1.3rem" }}>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.phonePartName}</td>
                  <td>{item.price.amount + " " + item.price.currency}</td>
                  <td>
                    <button
                      onClick={deleteFromCart}
                      id={item.id}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table class="table">
            <thead style={{ fontSize: "1.3rem" }}>
              <tr>
                <th scope="col">Total Price</th>
                <th></th>
                <th scope="col">{totalPrice + " " + currency}</th>
              </tr>
            </thead>
          </table>
          <div className="d-flex justify-content-end mt-4">
            <button
              onClick={placeOrder}
              className="btn btn-primary"
              style={{ fontSize: "1.2rem", width: "150px" }}
            >
              Place order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
