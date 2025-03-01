import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./PlaceOrder.css"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"

const PlaceOrder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext)
  const [data, setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    street : "",
    city : "",
    state : "",
    zipCode : "",
    country : "",
    phone : "",
  })
  
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }
  
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=> {
      if(cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      userId: localStorage.getItem("userId"),
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+25,
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers : {token}});
    console.log(response.data)
    if(response.data.success) {
      const {session_url} = response.data;
      console.log(session_url)
      window.location.replace(session_url)
    }
    else {
      console.log(response.data)
      alert("Error")
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      navigate("/cart")
    }
    else if(getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="firstName" value={data.firstName} type="text" placeholder="First Name"/>
          <input required onChange={onChangeHandler} name="lastName" value={data.lastName} type="text" placeholder="Last Name"/>
        </div>
        <input required onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder="Email address"/>
        <input required onChange={onChangeHandler} name="street" value={data.street} type="text" placeholder="Street"/>
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City"/>
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State"/>
        </div>
        <div className="multi-fields">
          <input required name="zipCode" onChange={onChangeHandler} value={data.zipCode} type="text" placeholder="ZIP Code"/>
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country"/>
        </div>
        <input required onChange={onChangeHandler} name="phone" value={data.phone} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
      <div className="cart-total">
					<h2>Cart Totals</h2>
					<div>
						<div className="cart-total-details">
							<p>Subtotal</p>
							<p>₹{getTotalCartAmount()}</p>
						</div>
						<hr />
						<div className="cart-total-details">
							<p>Delivery Fee</p>
							<p>₹{getTotalCartAmount() === 0 ? 0 : 25}</p>
						</div>
						<hr />
						<div className="cart-total-details">
							<b>Total</b>
							<b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 25}</b>
						</div>
					</div>
					<button type="submit">PROCEED TO PAYMENT</button>
				</div>
      </div>
    </form>
  )
}

export default PlaceOrder
