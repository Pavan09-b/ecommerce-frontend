import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    subtotal,
    tax,
    shipping,
    total,
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* EMPTY CART VIEW */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
          <div className="bg-pink-100 p-6 rounded-full">
            <ShoppingCart className="w-16 h-16 text-pink-600" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Your Cart is Empty
          </h2>

          <p className="mt-2 text-gray-600">
            Looks like you haven’t added anything yet.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-7">
            Shopping Cart
          </h1>

          <div className="flex gap-7">
            {/* LEFT: CART ITEMS */}
            <div className="flex flex-col gap-5 flex-1">
              {cart.map((item, i) => (
                <Card key={i}>
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={item.images[0]}
                        alt=""
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div>
                        <h1 className="font-semibold truncate w-40 sm:w-56">
                          {item.name}
                        </h1>
                        <p className="font-medium text-pink-600">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Quantity update */}
                    <div className="flex gap-3 items-center">
                      <Button
                        variant="outline"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </Button>
                      <span className="font-semibold">{item.qty}</span>
                      <Button
                        variant="outline"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                    {/* Price Total */}
                    <p className="font-semibold w-24 text-right">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>

                    {/* Remove */}
                    <p
                      className="text-red-500 cursor-pointer flex gap-1 items-center"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </p>
                  </div>

                  </div>
                </Card>
              ))}
            </div>

            {/* RIGHT: BILL SUMMARY */}
            <Card className="w-[350px] h-max">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-pink-600"
                  onClick={() => alert("Order Placed Successfully! 🎉")}
                >
                  PLACE ORDER
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to="/products">Continue Shopping</Link>
                </Button>

                <div className="text-xs text-muted-foreground">
                  <p>• 30-day return policy</p>
                  <p>• Secure checkout</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
