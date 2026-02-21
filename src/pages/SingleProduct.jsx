import React from "react";
import { useParams } from "react-router-dom";
import { productsData } from "@/assets/products";
import Breadcrums from "@/components/Breadcrums";
import ProductImg from "@/components/ProductImg";
import ProductDesc from "@/components/ProductDesc";

const SingleProduct = () => {
  const { id } = useParams();
  const product = productsData.find((item) => item.id === id);

  if (!product) return <div className="text-center pt-20">Product not found</div>;

  return (
    <div className="pt-20 py-10 max-w-7xl mx-auto">
      <Breadcrums product={product} />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <ProductImg images={product.images} />
        <ProductDesc product={product} />
      </div>
    </div>
  );
};

export default SingleProduct;
