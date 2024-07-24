import React, { useState, useEffect } from 'react';
import api from '../../api/Axios';
import AOS from 'aos';
import 'aos/dist/aos.css';


const ClientCity = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const images = [ //image for citys
    { img: "https://lh5.googleusercontent.com/p/AF1QipOWLTcmIFuAD-1fFMbuCPd2rZTnDmPkTzm9OJMf=w675-h390-n-k-no" },
    { img: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTv-vlkQBqSZZzXyMKYpS3cq_S-PF-YFn04_7jpg23qXGNK9SomSY6pFW1vxqpPiY4AJ4FYWIMn6maCN9PKFtRE9P5nIu-hyGEbXAoBNA" },
    { img: "https://lh5.googleusercontent.com/p/AF1QipNAmXt6f4IyOSlNoGayrQ-m-YtUK1OwVZY27BM=w675-h390-n-k-no"},
    { img: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTWrZ237knf1h6yOE7wnFhJumqQygZYOg2yB1Vp4ksFv4dSLuDWYheSa3ZeR_DW1m7H9QYSBEv1n8pd6UNXsrjMRYWWVDlc075IAK8t2w"},
    { img: "https://lh5.googleusercontent.com/p/AF1QipNaloXYHgJUBvXFR5hrVqzHEsaAyO7DfK3Y839J=w675-h390-n-k-no"}
  ];
  useEffect(() => {
    AOS.init();
  }, [])
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await api.get('/client/city/options');
        setStates(response.data.data);
      } catch (error) {
        console.error('Error fetching states:', error.response || error.message);
        setError('Failed to fetch states. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;



  return (
    <div data-aos="fade-up">
    <div className="container mx-auto p-4 text-center">
        <h1 className='text-2xl font-bold mb-4'>This are the City Of States Mention </h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {states.map((state, index) => (
          <li key={state.value} className="relative mb-2 group">
            <img src={images[index % images.length].img} alt={state.label} className="h-auto max-w-full rounded-lg group-hover:opacity-50 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center text-black text-5xl font-bold">
              {state.label}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ClientCity;
