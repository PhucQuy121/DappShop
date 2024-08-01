import React, { useState, useEffect } from 'react';
import '../css/CategoryList.css';

const CategoryList = ({ products, selectCategory }) => {
  const [categories, setCategories] = useState([]);

  // Set categories when products change
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map(fruit => fruit.category)));
    setCategories(['All', ...uniqueCategories]);
  }, [products]);

  return (
    <div className="category-list">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => selectCategory(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
