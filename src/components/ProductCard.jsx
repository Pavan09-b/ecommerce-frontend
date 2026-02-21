import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product, loading }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { id, images, price, name } = product;

  return (
    <div className="shadow-lg rounded-lg overflow-hidden h-max bg-white">
      <div className="aspect-square overflow-hidden">
        {loading ? (
          <Skeleton className="rounded-lg w-full h-full" />
        ) : (
          <img
            onClick={() => navigate(`/products/${id}`)}
            src={images[0]}
            alt={name}
            className="w-full h-full transition-transform duration-300 hover:scale-105 cursor-pointer"
          />
        )}
      </div>

      {loading ? (
        <div className="px-2 space-y-2 my-2">
          <Skeleton className="w-[200px] h-4" />
          <Skeleton className="w-[100px] h-4" />
          <Skeleton className="w-[150px] h-8" />
        </div>
      ) : (
        <div className="px-2 space-y-1">
          <h1 className="font-semibold line-clamp-2 h-12">{name}</h1>
          <h2 className="font-bold">₹{price}</h2>
          <Button
            onClick={() => addToCart(product)}
            className="bg-pink-600 mb-3 w-full"
          >
            <ShoppingCart /> Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
