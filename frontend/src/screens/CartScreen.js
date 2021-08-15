import React from "react";

function CartScreen(props) {
  const productId = props.match.params.id; // getting id
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1]) // if this does not exist set 1
    : 1;
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductId: {productId} Quantity: {qty}
      </p>
    </div>
  );
}

export default CartScreen;
