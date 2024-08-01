import React, { useEffect, useState } from 'react';
import Header from './Header';
import Menu from './Menu';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import Pagination from './Pagination';
import '../css/Container.css';

const Container = ({ state }) => {
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { contract } = state;

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const fruits = await contract.getFruits();
        setProducts(fruits);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    contract && fetchFruits();
  }, [contract]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter products based on category and searchTerm
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!category || product.category === category)
  );

  // Calculate total pages based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  // console.log(paginatedProducts)
  return (
    <div className="container">
      <Header onSearch={handleSearch} />
      <Menu />
      <div className="content">
        <CategoryList
          products={products}
          selectCategory={(category) => {
            setCategory(category === 'All' ? '' : category);
            setCurrentPage(1); // Reset to first page on category change
          }}
        />
        <ProductList
          products={paginatedProducts}
          contract={contract}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default Container;
