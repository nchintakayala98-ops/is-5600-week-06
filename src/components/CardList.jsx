import Card from './Card';
import Button from './Button';
import Search from './Search';
import React, { useState, useEffect } from "react";

const CardList = ({ data }) => {
  const limit = 10; // Number of products per page

  // Initial dataset for the first page
  const defaultDataset = data ? data.slice(0, limit) : [];
  const [offset, setOffset] = useState(0); // Tracks the starting index of the current page
  const [products, setProducts] = useState(defaultDataset); // Current products to display

  // Function to filter products by tags
  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) => {
      if (!tagQuery) return true; // If no query, show all products
      return product.tags.find(({ title }) =>
        title.toLowerCase() === tagQuery.toLowerCase() // Match tags case-insensitively
      );
    });

    setOffset(0); // Reset to the first page after filtering
    setProducts(filtered); // Update the displayed products
  };

  // Updates the products list when offset changes (for pagination)
  useEffect(() => {
    setProducts(data.slice(offset, offset + limit)); // Get products for the current page
  }, [offset, limit, data]);

  return (
    <div className="cf pa2">
      {/* Search bar to filter products by tags */}
      <Search handleSearch={filterTags} />

      {/* Product cards */}
      <div className="mt2 mb2">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} {...product} /> // Render individual product card
          ))
        ) : (
          <p>No products available</p> // Message if no products match the filter
        )}
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center justify-center pa4">
        {/* Previous button: Disabled if already at the first page */}
        <Button
          text="Previous"
          handleClick={() => setOffset(Math.max(0, offset - limit))} // Move to the previous page
          disabled={offset === 0}
        />
        {/* Next button: Disabled if at the last page */}
        <Button
          text="Next"
          handleClick={() => setOffset(offset + limit)} // Move to the next page
          disabled={offset + limit >= data.length}
        />
      </div>
    </div>
  );
};

export default CardList;