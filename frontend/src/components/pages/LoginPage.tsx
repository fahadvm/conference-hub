import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/profile');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Link to="/" className="flex items-center gap-3 mb-10">
        <Video className="w-8 h-8 text-primary" strokeWidth={1.5} />
        <span className="font-heading text-2xl uppercase tracking-wider text-foreground">meetUp</span>
      </Link>

      <div className="w-full max-w-md bg-background border border-gridline p-10 lg:p-12">
        <h1 className="font-heading text-4xl uppercase mb-2 tracking-wide text-foreground">
          Welcome Back
        </h1>
        <p className="font-paragraph text-subtletext mb-8">
          Enter your credentials to access your account.
        </p>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 mb-6 text-sm border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="email" className="font-heading text-base uppercase tracking-wider">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="password" className="font-heading text-base uppercase tracking-wider">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-subtletext hover:text-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-foreground px-8 py-6 text-base font-paragraph uppercase tracking-wider"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-gridline pt-6">
          <p className="font-paragraph text-subtletext">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-bold uppercase tracking-wide">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
