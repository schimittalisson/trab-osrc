'use client';

import React from 'react';
import { User } from 'firebase/auth';
import { LogOut, Mail, Shield, Calendar } from 'lucide-react';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-24 h-24 rounded-full border-4 border-primary-500"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {user.displayName || 'Anonymous User'}
          </h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Mail className="text-primary-600 mt-1" size={20} />
          <div>
            <p className="font-semibold text-gray-700">Email</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Verified: {user.emailVerified ? '✓ Yes' : '✗ No'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Shield className="text-primary-600 mt-1" size={20} />
          <div>
            <p className="font-semibold text-gray-700">User ID</p>
            <p className="text-gray-600 font-mono text-sm break-all">{user.uid}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Shield className="text-primary-600 mt-1" size={20} />
          <div>
            <p className="font-semibold text-gray-700">Authentication Provider</p>
            <p className="text-gray-600">
              {user.providerData[0]?.providerId || 'Unknown'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Calendar className="text-primary-600 mt-1" size={20} />
          <div>
            <p className="font-semibold text-gray-700">Account Created</p>
            <p className="text-gray-600">{formatDate(user.metadata.creationTime || null)}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Calendar className="text-primary-600 mt-1" size={20} />
          <div>
            <p className="font-semibold text-gray-700">Last Sign In</p>
            <p className="text-gray-600">{formatDate(user.metadata.lastSignInTime || null)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">OpenID Connect (OIDC) Information</h4>
        <p className="text-sm text-blue-800">
          This authentication uses the OpenID Connect protocol with Google as the Identity Provider (IdP).
          Your identity is verified through Google's secure infrastructure, and no password is stored in this application.
        </p>
      </div>
    </div>
  );
};
