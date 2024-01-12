import React, { useEffect, useState } from "react";
import "./products.scss";
import  '../../components/Grid'


const ProductsGrid = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const apiContext = useAPI();
    const navigate = useNavigate();
  
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    useEffect(() => {
        let isMounted = true;
        const getProducts = async () => {
          try {
            const newProducts = await fetchProducts(apiContext);
            if (isMounted) {
              setProducts(newProducts);
            }
          } catch (error) {
            // Handle errors by showing a toast notification or setting an error state
            console.log("Error fetching products:", error);
          }
        };
        getProducts();
        return () => {
          isMounted = false;
        };
    }, []);
  
  
    return (
     <></>
    );
  };