import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Video, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LogoutConfirmModal from '@/components/LogoutConfirmModal';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    ...(user ? [
      { path: '/meetings', label: 'Meetings' },
      { path: '/schedule', label: 'Schedule' },
      { path: '/profile', label: 'Profile' }
    ] : [])
  ];

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await signOut();
    navigate('/');
  };

  return (
    <header className="w-full bg-primary text-primary-foreground border-b border-gridline sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Video className="w-7 h-7" strokeWidth={1.5} />
            <span className="font-heading text-xl uppercase tracking-wider">meetUp</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-sm uppercase tracking-wider transition-opacity ${
                  location.pathname === link.path ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA / Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/meetings">
                  <Button className="bg-background text-foreground hover:bg-secondary px-6 py-5 text-sm font-paragraph uppercase tracking-wider">
                    Start Meeting
                  </Button>
                </Link>
                <Button 
                  onClick={() => setShowLogoutModal(true)}
                  variant="ghost" 
                  className="text-primary-foreground hover:bg-white/10 px-4 py-5"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-primary-foreground hover:bg-white/10 px-6 py-5 text-sm font-paragraph uppercase tracking-wider">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-background text-foreground hover:bg-secondary px-6 py-5 text-sm font-paragraph uppercase tracking-wider">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-gridline">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-paragraph text-sm uppercase tracking-wider transition-opacity ${
                    location.pathname === link.path ? 'opacity-100' : 'opacity-60'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link to="/meetings" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="bg-background text-foreground hover:bg-secondary w-full px-6 py-5 text-sm font-paragraph uppercase tracking-wider">
                      Start Meeting
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => { setShowLogoutModal(true); setMobileMenuOpen(false); }}
                    variant="outline" 
                    className="border-white/20 text-white w-full px-6 py-5 text-sm font-paragraph uppercase tracking-wider"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="border-white/20 text-white w-full px-6 py-5 text-sm font-paragraph uppercase tracking-wider">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="bg-background text-foreground hover:bg-secondary w-full px-6 py-5 text-sm font-paragraph uppercase tracking-wider">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>

      <LogoutConfirmModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
}
