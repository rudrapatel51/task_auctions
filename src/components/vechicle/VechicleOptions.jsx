import React, { useState, useEffect } from 'react';
import api from '../../api/Axios';
import { FaLuggageCart } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';


const VehicleOptions = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [message, setMessage] = useState('');

  // Function to fetch vehicle options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await api.get('/vehicle/options');
        setOptions(response.data.data);
      } catch (error) {
        console.error('Error fetching vehicle options:', error.response || error.message);
        setMessage('Failed to fetch vehicle options. Please try again.');
      }
    };

    fetchOptions();
  }, []);

  // Function to handle option selection
  const handleSelect = (value) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(value) ? prevSelected.filter((item) => item !== value) : [...prevSelected, value]
    );
  };

  // Function to submit selected options
  const handleSubmit = async () => {
    const mobile = localStorage.getItem('mobile'); // Retrieve mobile number from localStorage
    if (!mobile) {
      setMessage('Mobile number is required. Please login again.');
      return;
    }

    try {
      await api.post('/buyer/step-one', {
        mobile,
        vehicleId: selectedOptions,
      });
      setMessage('Selection submitted successfully!');
    } catch (error) {
      console.error('Error submitting selection:', error.response || error.message);
      setMessage('Failed to submit selection. Please try again.');
    }
  };
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url("https://img.freepik.com/free-vector/vibrant-fluid-gradient-background-with-curvy-shapes_1017-32108.jpg?w=1060&t=st=1721810926~exp=1721811526~hmac=d3667d001ea3f5bfc2943e0526862bd9131616692e30aefeeb648efbc1f05b53")` }}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl p-10 font-bold mb-4 text-center text-white">
          Select Vehicle Options
          </h1>
        <div data-aos="zoom-in">

        <div className="flex flex-wrap gap-6 container p-12 justify-center">
        
          {options.map((option) => (
            <div
              key={option.value}
              className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${
                selectedOptions.includes(option.value) ? 'bg-blue-500 dark:bg-blue-900' : ''
              } flex flex-col items-center cursor-pointer transition-colors duration-300`}
              onClick={() => handleSelect(option.value)}
            >
              <div className="p-5 text-center">
                <FaLuggageCart size={50} />
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
                  {option.label}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Click to select this option.
                </p>
              </div>
            </div>
          ))}

        </div>
        </div>
          {/* submit button */}
        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        {message && <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">{message}</p>}
      </div>
      <br/>
      <br/>
    </div>
  );
};

export default VehicleOptions;
