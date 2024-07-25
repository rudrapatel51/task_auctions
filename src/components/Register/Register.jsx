import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/Axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Register = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [orderId, setOrderId] = useState('');
  const [step, setStep] = useState('sendOtp');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSendOtp = async () => {
    try {
      const response = await api.post('/otp-service/send', { mobile });
      setOrderId(response.data.orderId);
      setStep('verifyOtp');
      setMessage('OTP sent successfully! Please check your mobile.');
    } catch (error) {
      console.error('Error sending OTP:', error.response || error.message);
      setMessage('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await api.post('/buyer-login', { mobile, otp, orderId });
      navigate('/vehicle-options');
    } catch (error) {
      console.error('Error verifying OTP:', error.response || error.message);
      setMessage('Failed to verify OTP. Please check the OTP and try again.');
    }
  };

  return (
    <section className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: 'url(./backgroundimage.jpg)' }}>
      <div className="w-full max-w-md bg-white bg-opacity-80 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-28 h-8 mr-2" src="https://jp-task.vercel.app/assets/images/newJPLogo.png" alt="logo" />
          </a>
          <h1 className='flex items-center justify-center mb-6 text-2xl font-bold text-gray-900 dark:text-white'>Register</h1>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            {step === 'sendOtp' ? 'Enter your mobile number' : 'Verify OTP'}
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
            {step === 'sendOtp' ? (
              <div>
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your mobile number"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
                >
                  Send OTP
                </button>
              </div>
            ) : (
              <div>
                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter OTP"
                  required
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
                >
                  Verify OTP
                </button>
              </div>
            )}
            {message && <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">{message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
