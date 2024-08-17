import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [shops, setShops] = useState([]);
  const [filter, setFilter] = useState({ shop: '', date: '' });
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:8000/sales/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSales(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSalesData();
  }, []);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('http://localhost:8000/shops/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setShops(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchShops();
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  // Filter sales data
  const filteredSales = sales.filter(sale => {
    const isShopMatch = filter.shop ? sale.shop === parseInt(filter.shop) : true;
    const isDateMatch = filter.date ? new Date(sale.date).toISOString().split('T')[0] === filter.date : true;
    return isShopMatch && isDateMatch;
  });

  // Paginate the filtered sales
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const paginatedSales = filteredSales.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      try {
        const response = await fetch(`http://localhost:8000/sales/${id}/`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Remove the deleted sale from the state
        setSales(sales.filter(sale => sale.id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Handle edit action
  const handleEdit = (id) => {
    navigate(`/sales/edit/${id}`);
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Sales Data</h1>
      
      {/* Filter Form */}
      <div className="flex justify-center mb-6">
        <form className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4 w-full max-w-4xl">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex flex-col w-full">
              <label htmlFor="shop" className="text-gray-700 font-medium mb-1">Filter by Shop:</label>
              <select
                name="shop"
                id="shop"
                value={filter.shop}
                onChange={handleFilterChange}
                className="form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">All Shops</option>
                {shops.map(shop => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full mt-4 md:mt-0">
              <label htmlFor="date" className="text-gray-700 font-medium mb-1">Filter by Date:</label>
              <input
                type="date"
                name="date"
                id="date"
                value={filter.date}
                onChange={handleFilterChange}
                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* Sales Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Shop Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cash In</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cash Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Till In</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Till Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-100 transition-all">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shops.find(shop => shop.id === sale.shop)?.name || 'Unknown'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sale.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.cash_in}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.cash_out}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.till_in}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.till_out}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                  <button
                    onClick={() => handleEdit(sale.id)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sale.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 rounded-md shadow-md ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SalesPage;
