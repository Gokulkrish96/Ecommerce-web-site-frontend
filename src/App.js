import "./App.css";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";
import Home from "./Components/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./Components/product/ProductDetail";
import ProductSearch from "./Components/product/ProductSearch";
import Login from "./Components/user/Login";
import Register from "./Components/user/Register";
import store from "./store";
import { loadUser } from "./actions/userActions";
import { useEffect, useState } from "react";
import Profile from "./Components/user/Profile";
import ProtectedRoute from "./Components/route/ProtectedRoute";
import UpdateProfile from "./Components/user/UpdateProfile";
import UpdatePassword from "./Components/user/UpdatePassword";
import ForgotPassword from "./Components/user/ForgotPassword";
import ResetPassword from "./Components/user/ResetPassword";
import Cart from "./Components/cart/Cart";
import Shipping from "./Components/cart/Shipping";
import ConfirmOrder from "./Components/cart/ConfirmOrder";
import Payment from "./Components/cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./Components/cart/OrderSuccess";
import UserOrders from "./Components/order/UserOrders";
import OrderDetail from "./Components/order/OrderDetail";
import Dashboard from "./Components/admin/Dashboard";
import ProductList from "./Components/admin/ProductList";
import NewProduct from "./Components/admin/NewProduct";
import UpdateProduct from "./Components/admin/UpdateProduct";
import OrderList from "./Components/admin/OrderList";
import UpdateOrder from "./Components/admin/UpdateOrder";
import UserList from "./Components/admin/UserList";
import UpdateUser from "./Components/admin/UpdateUser";
import ReviewList from "./Components/admin/ReviewList";


function App() {
  const a = 0;
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
     store.dispatch(loadUser);
    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container container-fluid">
            <ToastContainer theme="dark" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/myprofile"element={ <ProtectedRoute><Profile /> </ProtectedRoute> }/>
              <Route
                path="/myprofile/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myprofile/update/password"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <UserOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
              {stripeApiKey && (
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  }
                />
              )}
            </Routes>
          </div>

          {/*Admin Routes*/}
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/products/create" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<UpdateOrder />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/user/:id" element={<UpdateUser />} />
            <Route path="/admin/reviews" element={<ReviewList />} />
          </Routes>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
