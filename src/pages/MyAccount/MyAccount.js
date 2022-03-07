import React, { useState, useEffect } from "react";
import "./MyAccount.css";
import useAxios from "../../Data/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../states/userSlicer";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  document.title = "My Account | BookStore";

  const { access_token } = useSelector((state) => state.user);

  const [myorders, setMyorders] = useState([]);

  const api = useAxios();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const geMyOrders = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token?.access}`,
      },
    };
    try {
      const resp = await api.get("/api/v1/orders/", config);
      if (resp.status === 200) {
        setMyorders(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutuser = () => {
    dispatch(removeToken());
    navigate("/");
  };

  useEffect(() => {
    window.scroll(0, 0);
    geMyOrders();
  }, []);

  return (
    <div className="container mt-2">
      <button
        className="btn btn-danger mt-2 mb-4 justify-content-end"
        onClick={() => {
          logoutuser();
        }}
      >
        Log Out
      </button>
      <div className="container">
        {myorders.length > 0 ? (
          myorders.map((order, index) => {
            return (
              <div className="container" key={index}>
                <div className="d-flex justify-content-between">
                  <h1 className="display-6">#ORDER NO.: {order.id}</h1>
                  <h1 className="display-6">Paid(KSH): {order.paid_amount}</h1>
                  <h1 className="display-6">Status: {order.status}</h1>
                </div>

                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src={item.product.get_thumbnail}
                              alt="order Item"
                              style={{ height: "90px" }}
                            />
                          </td>
                          <td>KSH. {item.product.price}</td>
                          <td>{item.quantity}</td>
                          <td>
                            KSH.{" "}
                            {parseInt(item.product.price) *
                              parseInt(item.quantity)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })
        ) : (
          <p>You dont have any order yet!!!</p>
        )}
      </div>
    </div>
  );
}

export default MyAccount;
