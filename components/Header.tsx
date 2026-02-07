'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { SocialIconsRow, DEFAULT_SOCIAL_LINKS } from './SocialIcons';
import { Container } from './ui';

// ===================================================================
// CONFIGURATION
// ===================================================================
const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/in-the-kitchen', label: 'In The Kitchen' },
  { href: '/ook', label: 'Out of Kitchen' },
  { href: '/about', label: 'About' },
] as const;

// ===================================================================
// HEADER COMPONENT
// ===================================================================
export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-background border-b border-green transition-all duration-300">
      <Container>
        <div className="flex items-center h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href="/"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Go to homepage"
          >
            <Image
              src="/logo.svg"
              alt="Hello Amanda Lynn"
              width={48}
              height={48}
              className="h-10 sm:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10 flex-1 justify-center">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-lg font-semibold whitespace-nowrap transition-colors hover:text-green ${
                    isActive ? 'text-green' : 'text-foreground'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              );
            })}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-lg font-semibold hover:text-green ml-2 transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-foreground" />
            </button>
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden lg:block ml-auto">
            <SocialIconsRow 
              links={DEFAULT_SOCIAL_LINKS} 
              size="sm" 
              gap="sm"
            />
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2 ml-auto">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                closeMenu();
              }}
              className="p-2 text-foreground hover:text-green transition-colors"
              aria-label="Toggle search"
            >
              <Search size={24} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:text-green transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 pt-2 flex flex-col gap-4 border-t border-border/50">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className={`py-2 text-left transition-colors hover:text-green ${
                    isActive ? 'text-green' : 'text-foreground'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              );
            })}
            
            {/* Mobile Social Icons */}
            <div className="flex justify-center pt-4 mt-2 border-t-2 border-green">
              <SocialIconsRow links={DEFAULT_SOCIAL_LINKS} size="md" />
            </div>
          </nav>
        )}
      </Container>

      {/* TODO: Integrate SearchOverlay component */}
      {/* <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} /> */}
    </header>
  );
}
