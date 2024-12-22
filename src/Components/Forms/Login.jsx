import React, { useState } from 'react';
import { login as loginService } from '../../store/authSlice';
import { useForm } from 'react-hook-form';
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { Button, Input } from '../index';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Track login process
    const { handleSubmit, register } = useForm();
    const dispatch = useDispatch();

    const login = async (data) => {
        setError('');
        setLoading(true); // Disable the button during login
        try {
            const session = await authService.loginUser(data); // Ensure `authService.loginUser` returns a Promise
            if (session) {
                const userData = await authService.getCurrentuser(); // Ensure this also returns a Promise
                if (userData){console.log(userData);
                 dispatch(loginService(userData));}
                navigate('/');
            }
        } catch (error) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false); // Re-enable the button
        }
    };

    return (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-10 rounded-lg shadow-3xl w-[96%] lg:w-1/2 '>
            <h1 className="text-4xl text-center text-white font-bold">Login</h1>
            <p className='text-center text-gray-300 my-5'>
                Don't Have an Account?{' '}
                <Link to="/signup" className='underline cursor-pointer hover:text-gray-100 transition-colors'>
                    Signup
                </Link>
            </p>
            {error && <p className='text-red-600 text-center mt-8'>{error}</p>}
            <form onSubmit={handleSubmit(login)}>
                <div className="space-y-5">
                    <Input
                        label="Email"
                        labelClass="text-white font-bold text-2xl drop-shadow-lg"
                        type="email"
                        placeholder="Enter Your Email"
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) => {
                                    return (
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Email should be valid'
                                    );
                                },
                            },
                        })}
                    />
                    <Input
                        label="Password"
                        labelClass="text-white font-bold text-2xl drop-shadow-lg"
                        type="password"
                        placeholder="Enter Your password"
                        {...register('password', {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    <Button
                        className={`w-40 relative left-1/2 -translate-x-1/2 my-10 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? 'Logging in...' : 'Login'} {/* Show loading text */}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
