import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const shopOptions = [
  { id: 1, name: 'cyber' },
  { id: 2, name: 'milk_shop' },
  { id: 3, name: 'retail_shop' }
];

const AddSalePage = () => {
  const [shop, setShop] = useState('');
  const [date, setDate] = useState('');
  const [cashIn, setCashIn] = useState('');
  const [cashOut, setCashOut] = useState('');
  const [tillIn, setTillIn] = useState('');
  const [tillOut, setTillOut] = useState('');
  const [closingBalance, setClosingBalance] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('shop', shop);
    formData.append('date', date);
    formData.append('cash_in', cashIn);
    formData.append('cash_out', cashOut);
    formData.append('till_in', tillIn);
    formData.append('till_out', tillOut);
    formData.append('closing_balance', closingBalance);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/sales/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Sale added successfully:', response.data);
      navigate('/sales');
    } catch (error) {
      console.error('Add sale error:', error.response ? error.response.data : error.message);
      setError('Failed to add sale. Please check the console for details.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">Add New Sale</h1>
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="shop">Shop</label>
            <select
              id="shop"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select a shop</option>
              {shopOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cash_in">Cash In</label>
              <input
                type="number"
                id="cash_in"
                value={cashIn}
                onChange={(e) => setCashIn(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cash_out">Cash Out</label>
              <input
                type="number"
                id="cash_out"
                value={cashOut}
                onChange={(e) => setCashOut(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="till_in">Till In</label>
              <input
                type="number"
                id="till_in"
                value={tillIn}
                onChange={(e) => setTillIn(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="till_out">Till Out</label>
              <input
                type="number"
                id="till_out"
                value={tillOut}
                onChange={(e) => setTillOut(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="closing_balance">Closing Balance</label>
            <input
              type="number"
              id="closing_balance"
              value={closingBalance}
              onChange={(e) => setClosingBalance(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 text-sm"
          >
            Add Sale
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSalePage;
