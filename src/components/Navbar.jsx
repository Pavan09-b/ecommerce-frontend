import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
        
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src="/Ekart.png" alt="logo" className="w-[100px]" />
        </div>

        {/* Navigation */}
        <nav className="flex gap-10 items-center text-lg font-semibold">
          <Link to={"/"}>Home</Link>
          <Link to={"/products"}>Products</Link>
          <Link to={"/about"}>About</Link>

          {/* Cart */}
          <Link to={"/cart"} className="relative">
            <ShoppingCart />
            <span className="bg-pink-600 rounded-full absolute text-white -top-3 -right-4 px-2 text-sm">
              {cartCount}
            </span>
          </Link>

          {/* Aesthetic Dummy Login Button (Optional UI Only) */}
          <Button
            className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white"
            onClick={() => navigate("/cart")} // could navigate anywhere
          >
            Login
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
