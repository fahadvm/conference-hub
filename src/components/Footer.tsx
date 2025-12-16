import { Link } from 'react-router-dom';
import { Video, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground border-t border-gridline">
      <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Video className="w-7 h-7" strokeWidth={1.5} />
              <span className="font-heading text-xl uppercase tracking-wider">ConferenceHub</span>
            </Link>
            <p className="font-paragraph text-sm text-primary-foreground opacity-70 leading-relaxed">
              Premium video conferencing for modern teams. Connect, collaborate, and communicate with confidence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-heading text-base uppercase tracking-wider mb-6">Product</h3>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'Security', 'Enterprise'].map((item) => (
                <li key={item}>
                  <Link to="/" className="font-paragraph text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-base uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-4">
              {['About', 'Careers', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="/" className="font-paragraph text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-base uppercase tracking-wider mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-paragraph text-sm opacity-70">support@conferencehub.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-paragraph text-sm opacity-70">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gridline mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm opacity-60">
              © 2025 ConferenceHub. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link to="/" className="font-paragraph text-sm opacity-60 hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <Link to="/" className="font-paragraph text-sm opacity-60 hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
