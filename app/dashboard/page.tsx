'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { UserProfile } from '@/components/UserProfile';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome to Your Dashboard
            </h1>
            <p className="text-gray-600">
              You have successfully authenticated using OpenID Connect
            </p>
          </div>
          
          {user && <UserProfile user={user} />}
        </div>
      </div>
    </ProtectedRoute>
  );
}
