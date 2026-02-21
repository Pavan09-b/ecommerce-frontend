import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

const ProductDesc = ({ product }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      {/* Product Name */}
      <h1 className="font-bold text-4xl text-gray-800">{product.name}</h1>

      {/* Brand + Category */}
      <p className="text-gray-700 font-medium">
        {product.category} | {product.brand}
      </p>

      {/* Price */}
      <h2 className="text-pink-600 font-bold text-3xl">
        ₹{product.price.toLocaleString("en-IN")}
      </h2>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed line-clamp-6">
        {product.desc}
      </p>

      {/* Quantity */}
      <div className="flex gap-2 items-center">
        <p className="text-gray-800 font-semibold">Quantity :</p>
        <Input
          type="number"
          className="w-16"
          min={1}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </div>

      {/* Add to Cart */}
      <Button
        className="bg-pink-600 text-white w-max mt-3"
        onClick={() =>
          [...Array(qty)].map(() => addToCart(product)) // add qty times
        }
      >
        <ShoppingCart className="mr-2" />
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDesc;
