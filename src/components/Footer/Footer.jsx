import { Link } from 'react-router-dom';



function Footer() {
  return (
    <footer className="text-gray-600 shadow-sm body-font text-[10px] sm:text-xs">
      {/* Main Section */}
      <div className="px-4 py-4 mx-auto max-w-screen-xl flex flex-wrap justify-between gap-y-6">
        {/* Description */}
        <div className="w-[45%] sm:w-[22%] md:w-[18%] min-w-[120px]">
          <a className="flex title-font font-medium items-start text-gray-900 mb-1">
            <img
              src="/KHELiNFOlogo.png"
              alt="KHELiNFO Logo"
              className="h-5 sm:h-6 object-contain"
            />
          </a>
          <p className="leading-tight">All-in-one sports platform with real-time updates.</p>
        </div>

        {/* Quick Links */}
        <div className="w-[45%] sm:w-[22%] md:w-[18%] min-w-[100px]">
          <h2 className="font-semibold text-gray-900 mb-1">Quick Links</h2>
          <ul className="list-none space-y-1">
            <li><a className="hover:text-gray-800">ICC Rankings</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="w-[45%] sm:w-[22%] md:w-[18%] min-w-[100px]">
          <h2 className="font-semibold text-gray-900 mb-1">Company</h2>
          <ul className="list-none space-y-1 grid">
            <Link to='/careers' className="hover:text-gray-800">Careers </Link>
            <Link to='/advertise' className="hover:text-gray-800">Advertise</Link>
            <Link to='privacy' className="hover:text-gray-800">Privacy</Link>
            <Link to='terms' className="hover:text-gray-800">Terms</Link>
          </ul>
        </div>

        {/* Sports */}
        <div className="w-[45%] sm:w-[22%] md:w-[18%] min-w-[100px]">
          <h2 className="font-semibold text-gray-900 mb-1">Sports</h2>
          <ul className="list-none space-y-1">
            <li><Link to='cricket' className="hover:text-gray-800">Cricket</Link></li>
            <li><Link to="/football" className="hover:text-gray-800">Football</Link></li>
            <li><Link to="/kabaddi" className="hover:text-gray-800">Kabaddi</Link></li>
            <li><Link to="/basketball" className="hover:text-gray-800">Basketball</Link></li>
          </ul>
        </div>

        {/* Sites */}
        <div className="w-[45%] sm:w-[22%] md:w-[18%] min-w-[100px]">
          <h2 className="font-semibold text-gray-900 mb-1">Sites</h2>
          <ul className="list-none space-y-1">
            <li>
              <a
                href="https://khelinfo.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-800"
              >
                KHELiNFO
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100">
        <div className="container mx-auto py-2 px-3 flex flex-wrap items-center justify-between text-[10px] sm:text-xs gap-y-2">
          <p className="text-gray-500">© 2025 KHELiNFO</p>
          <span className="inline-flex space-x-2">
            <a className="text-gray-500">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a className="text-gray-500">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1a10.66 10.66 0 01-9-4s-4 9 5 13c-3 2-7 2-7 2 9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/khelinfo.official/" className="text-gray-500">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </a>
            <a className="text-gray-500">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
