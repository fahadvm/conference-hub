import { Link, useLocation } from 'react-router-dom';
import { Video, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/meetings', label: 'Meetings' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/profile', label: 'Profile' }
  ];

  return (
    <header className="w-full bg-primary text-primary-foreground border-b border-gridline sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Video className="w-7 h-7" strokeWidth={1.5} />
            <span className="font-heading text-xl uppercase tracking-wider">ConferenceHub</span>
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/meetings">
              <Button className="bg-background text-foreground hover:bg-secondary px-6 py-5 text-sm font-paragraph uppercase tracking-wider">
                Start Meeting
              </Button>
            </Link>
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
              <Link to="/meetings" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-background text-foreground hover:bg-secondary w-full px-6 py-5 text-sm font-paragraph uppercase tracking-wider">
                  Start Meeting
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
