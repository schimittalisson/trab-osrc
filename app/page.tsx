'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoginButton } from '@/components/LoginButton';
import { Shield, Lock, CheckCircle } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-600 p-4 rounded-full">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            OpenID Connect Authentication
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Secure Authentication with Google Identity Provider
          </p>
          <p className="text-sm text-gray-500">
            Network and Computer Security - UDESC/CCT
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Sign In to Continue
            </h2>
            <p className="text-gray-600 mb-8">
              Use your Google account to authenticate securely using the OpenID Connect protocol
            </p>
            <LoginButton />
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary-600" />
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-100 p-3 rounded-full mb-3">
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">1. Redirect</h4>
                <p className="text-sm text-gray-600">
                  You're redirected to Google's secure authentication page
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-100 p-3 rounded-full mb-3">
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">2. Authenticate</h4>
                <p className="text-sm text-gray-600">
                  Sign in with your Google account credentials
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-100 p-3 rounded-full mb-3">
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">3. Access Granted</h4>
                <p className="text-sm text-gray-600">
                  Return to the app with a secure ID token
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            About This Implementation
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            This is a demonstration of <strong>OpenID Connect (OIDC)</strong> authentication protocol 
            using <strong>Google as the Identity Provider (IdP)</strong>. The implementation uses 
            Firebase Authentication which handles the OAuth 2.0 and OIDC flows automatically. 
            No passwords are stored in this application - authentication is delegated to Google's 
            trusted infrastructure, enhancing security and user experience.
          </p>
        </div>
      </div>
    </main>
  );
}
