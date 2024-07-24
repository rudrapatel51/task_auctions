import React, { useState, useEffect } from 'react';
import api from '../../api/Axios';
import ClientCity from './ClientCity';

const ClientState = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await api.get('/client/state/options');
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
    <>
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">This are the State we provide the auctions</h1>
      <ul>
        {states.map((state) => (
            <li key={state.value} className="mb-2">
            <span className="font-semibold">{state.label}</span> - {state.code}
          </li>
        ))}
      </ul>
    </div>
    <ClientCity/>
  </>
  );
};

export default ClientState;
