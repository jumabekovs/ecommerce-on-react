import React from "react";
import { Route, Switch } from "react-router-dom";
import LoadingBox from "./components/LoadingBox";
import PrivateRoute from "./components/PrivateRoute";

const CartScreen = React.lazy(() => import("./screens/CartScreen"));
const HomeScreen = React.lazy(() => import("./screens/HomeScreen"));
const OrderHistoryScreen = React.lazy(() =>
  import("./screens/OrderHistoryScreen")
);
const OrderScreen = React.lazy(() => import("./screens/OrderScreen"));
const PaymentMethodScreen = React.lazy(() =>
  import("./screens/PaymentMethodScreen")
);
const PlaceOrderScreen = React.lazy(() => import("./screens/PlaceOrderScreen"));
const ProductScreen = React.lazy(() => import("./screens/ProductScreen"));
const ProductsScreen = React.lazy(() => import("./screens/ProductsScreen"));
const ProfileScreen = React.lazy(() => import("./screens/ProfileScreen"));
const RegisterScreen = React.lazy(() => import("./screens/RegisterScreen"));
const ShippingAddressScreen = React.lazy(() =>
  import("./screens/ShippingAddressScreen")
);
const SigninScreen = React.lazy(() => import("./screens/SigninScreen"));

function Routes() {
  return (
    <React.Suspense fallback={<LoadingBox />}>
      <Switch>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/products" component={ProductsScreen}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
        <Route path="/" component={HomeScreen} exact></Route>
      </Switch>
    </React.Suspense>
  );
}

export default Routes;
