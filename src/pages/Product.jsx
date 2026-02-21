import React, { useEffect, useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productsData } from "@/assets/products"; 

const Product = () => {
  const [allProducts, setAllProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200000]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    let updated = [...allProducts];

    if (search.trim() !== "") {
      updated = updated.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      updated = updated.filter(p => p.category === category);
    }

    if (brand !== "All") {
      updated = updated.filter(p => p.brand === brand);
    }

    updated = updated.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortOrder === "lowToHigh") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
    setCurrentPage(1);
  }, [search, category, brand, sortOrder, priceRange]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto flex gap-7">

        <FilterSidebar
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          category={category}
          setCategory={setCategory}
          allProducts={allProducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <div className="flex-1">

          <div className="flex justify-end mb-4">
            <Select onValueChange={value => setSortOrder(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lowToHigh">🠗 Price: Low to High</SelectItem>
                <SelectItem value="highToLow">🠕 Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {currentProducts.length > 0 ? (
              currentProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>

          {filteredProducts.length > productsPerPage && (
            <div className="flex justify-center items-center gap-3 mt-8">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <span>Page {currentPage} of {totalPages}</span>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Product;
