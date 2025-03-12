import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicationList = () => {
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const fetchProductList = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/rest/s1/pysurance/product", {
                params: { page, perPage: rowsPerPage },
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                withCredentials: true
            });

            setData(response.data.products);
            setTotalRecords(response.data.totalCount || 0);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductList(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalRecords / rowsPerPage)) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="mx-auto p-6">

            {loading ? (
                <p className="text-lg text-blue-600 font-semibold">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Product List</h3>
                    <table className="w-full border-collapse border border-gray-300 shadow-md">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left">
                                <th className="px-4 py-2 border">Product ID</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Owner Party ID</th>
                                <th className="px-4 py-2 border">Product Type Enum ID</th>
                                <th className="px-4 py-2 border">Product Class Enum ID</th>
                                <th className="px-4 py-2 border">Product Category ID</th>
                                <th className="px-4 py-2 border">Origin Geo ID</th>
                                <th className="px-4 py-2 border">Sales Introduction Date</th>
                                <th className="px-4 py-2 border">Sales Discontinuation Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-50 even:bg-gray-100">
                                        <td className="px-4 py-2 border">{product?.productId}</td>
                                        <td className="px-4 py-2 border">{product?.productName}</td>
                                        <td className="px-4 py-2 border">{product?.ownerPartyId}</td>
                                        <td className="px-4 py-2 border">{product?.productTypeEnumId}</td>
                                        <td className="px-4 py-2 border">{product?.productClassEnumId}</td>
                                        <td className="px-4 py-2 border">{product?.productCategoryId}</td>
                                        <td className="px-4 py-2 border">{product?.originGeoId}</td>
                                        <td className="px-4 py-2 border">{product?.salesIntroductionDate}</td>
                                        <td className="px-4 py-2 border">{product?.salesDiscontinuationDate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-600 py-4">No Data Available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                >
                    Prev
                </button>

                <span className="text-lg font-semibold text-gray-800">
                    Page {currentPage} of {Math.max(1, Math.ceil(totalRecords / rowsPerPage))}
                </span>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= Math.ceil(totalRecords / rowsPerPage)}
                    className={`px-4 py-2 rounded-md ${currentPage >= Math.ceil(totalRecords / rowsPerPage) ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ApplicationList;
