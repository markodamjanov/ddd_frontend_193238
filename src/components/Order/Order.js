import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderAxios } from "../../custom-axios/axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [canCreateOrder, setCanCreateOrder] = useState(true);
  const navigate = useNavigate();
  let num = 1;

  useEffect(() => {
    orderAxios.get("/orders").then((response) => {
      setOrders(response.data);
    });
  }, [orders.length]);

  const createOrder = () => {
    orderAxios.post("/create").then((response) => {
      if (response === "Order already created.") {
        setError(true);
      }
    });
    navigate("/parts");
  };

  const totalPrice = (itemList) => {
    let total = 0;
    let currency = "";
    itemList.map((i) => {
      total += i.price.amount;
      currency = i.price.currency;
    });
    return total + " " + currency;
  };

  useEffect(() => {
    orders.map((item) => {
      if (item.orderState === "PROCESSING") {
        setCanCreateOrder(false);
      } else {
        setCanCreateOrder(true);
      }
    });
  });

  const NoOrdersYet = (
    <div
      style={{
        fontSize: "3rem",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      <p style={{ marginTop: "10px" }}>No orders yet.</p>
      <button
        className="btn btn-primary"
        style={{
          width: "300px",
          fontSize: "1.2rem",
          padding: "10px",
        }}
        onClick={createOrder}
      >
        Create your first order
      </button>
    </div>
  );

  const OrderList = (
    <div className="container">
      {canCreateOrder ? (
        <button
          className="btn btn-primary mt-4"
          style={{
            padding: "10px",
          }}
          onClick={createOrder}
        >
          Create your order
        </button>
      ) : (
        ""
      )}
      <table class="table mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order Date</th>
            <th scope="col">Order State</th>
            <th scope="col">Order Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.id} style={{ fontSize: "1.2rem" }}>
              <th scope="row">{num++}</th>
              <th>
                {item.orderedOn != null
                  ? item.orderedOn.slice(0, 10)
                  : "Not yet ordered"}
              </th>
              <td>{item.orderState}</td>
              <td>{totalPrice(item.orderItemList)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {error ? <div>Order already created</div> : ""}
      {orders.length === 0 ? NoOrdersYet : OrderList}
    </div>
  );
};

export default Order;
