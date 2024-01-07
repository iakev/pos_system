import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useAPI } from "../../services/api/useAPI";
import { fetchSingleSupplier } from "../../services/api/suppliers/fetchSuppliers";
import SupplierInfo from "../../components/supplierComponents/supplierInfo/SupplierInfo";
import SupplierProducts from "../../components/supplierComponents/supplierProducts/SupplierProducts";
import ContentGrid from "../../components/pageContent/ContentGrid";

const SingleSupplier = () => {
  const [supplier, setSupplier] = useState({});
  const { id } = useParams();
  const apiContext = useAPI();

  useEffect(() => {
    const getSupplier = async () => {
      const singleSupplier = await fetchSingleSupplier(apiContext, id)
      setSupplier(singleSupplier);
    };
    getSupplier();
  }, []);

  const singleSupplierPageContent = {
    isLoading: Object.keys(supplier).length === 0,
    sections: [
      {
        component: SupplierInfo,
        componentProps: {
          name: supplier?.name,
          instance: supplier,
        }
      },
      {
        component: SupplierProducts,
        componentProps: {
          uuid: id,
          context: apiContext,
        }
      },
    ]
  }


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <ContentGrid content={singleSupplierPageContent} />
      </div>
    </div>
  );
};

export default SingleSupplier;
