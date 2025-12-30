import { Mail, ArrowLeft } from 'lucide-react';

interface SignUpScreenProps {
  onComplete: () => void;
}

export function SignUpScreen({ onComplete }: SignUpScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600">Choose your preferred sign up method</p>
        </div>

        <div className="space-y-3">
          {/* Google */}
          <button
            onClick={onComplete}
            className="w-full px-6 py-4 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all flex items-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="flex-1 text-left">Continue with Google</span>
          </button>

          {/* Microsoft */}
          <button
            onClick={onComplete}
            className="w-full px-6 py-4 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all flex items-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#F25022" d="M0 0h11.377v11.372H0z" />
              <path fill="#00A4EF" d="M12.623 0H24v11.372H12.623z" />
              <path fill="#7FBA00" d="M0 12.628h11.377V24H0z" />
              <path fill="#FFB900" d="M12.623 12.628H24V24H12.623z" />
            </svg>
            <span className="flex-1 text-left">Continue with Microsoft</span>
          </button>

          {/* Apple */}
          <button
            onClick={onComplete}
            className="w-full px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all flex items-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="flex-1 text-left">Continue with Apple</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Email */}
          <button
            onClick={onComplete}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-3"
          >
            <Mail className="w-6 h-6" />
            <span className="flex-1 text-left">Continue with Email</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{' '}
          <button className="text-blue-600 hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
