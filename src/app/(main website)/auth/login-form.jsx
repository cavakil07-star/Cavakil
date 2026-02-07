'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2, Mail, Lock, Phone, User as UserIcon, Building2, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const [variant, setVariant] = useState('LOGIN'); // 'LOGIN' | 'REGISTER'
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    company: '',
    designation: ''
  });

  const toggleVariant = () => {
    setVariant((prev) => prev === 'LOGIN' ? 'REGISTER' : 'LOGIN');
    setFormData({ name: '', email: '', phone: '', password: '', company: '', designation: '' });
  };

  const handlescan = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (variant === 'REGISTER') {
        // Register API Call
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        toast.success('Account created! Please login.');
        setVariant('LOGIN');
      } else {
        // NextAuth Login
        const result = await signIn('credentials', {
           ...formData,
           redirect: false,
        });

        if (result?.error) {
          throw new Error('Invalid credentials');
        }

        if (result?.ok) {
          toast.success('Logged in successfully!');
          router.push(callbackUrl);
          router.refresh(); 
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400";
  const iconClasses = "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400";

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            {variant === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
          </motion.h2>
          <p className="text-gray-500 text-sm">
            {variant === 'LOGIN' 
              ? 'Enter your credentials to access your account' 
              : 'Join us today and start your journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode='popLayout'>
            {variant === 'REGISTER' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {/* Name */}
                <div className="relative">
                  <UserIcon className={iconClasses} />
                  <input
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handlescan}
                    className={inputClasses}
                  />
                </div>
                
                {/* Phone */}
                <div className="relative">
                  <Phone className={iconClasses} />
                  <input
                    name="phone"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handlescan}
                    className={inputClasses}
                  />
                </div>

                {/* Company & Designation Split */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Building2 className={iconClasses} />
                    <input
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handlescan}
                      className={inputClasses}
                    />
                  </div>
                  <div className="relative">
                    <Briefcase className={iconClasses} />
                    <input
                      name="designation"
                      placeholder="Designation"
                      value={formData.designation}
                      onChange={handlescan}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div className="relative">
            <Mail className={iconClasses} />
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handlescan}
              className={inputClasses}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className={iconClasses} />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={formData.password}
              onChange={handlescan}
              className={inputClasses}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 mb-6">
             {variant === 'LOGIN' && (
               <Link href="/auth/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                 Forgot password?
               </Link>
             )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {variant === 'LOGIN' ? 'Sign In' : 'Sign Up'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {variant === 'LOGIN' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={toggleVariant}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {variant === 'LOGIN' ? 'Create account' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
