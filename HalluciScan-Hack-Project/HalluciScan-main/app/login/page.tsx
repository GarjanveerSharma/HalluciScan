'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Header';
import Footer from '../../components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    alert('Login functionality would be implemented here');
  };

  return (
    <main>
      <Navbar />
      <section className="auth-page section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card card">
              <div className="auth-header text-center">
                <h1>Welcome Back</h1>
                <p>Sign in to your HalluciScan account</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn auth-submit">
                  Sign In
                </button>
              </form>

              <div className="auth-links">
                <Link href="/forgot-password">Forgot password?</Link>
                <p>
                  Don&apos;t have an account?{' '}
                  <Link href="/signup">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}