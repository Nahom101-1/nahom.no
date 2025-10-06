'use client';
import StaggeredMenu from '../StaggeredMenu';

const menuItems = [
  { label: 'Education', ariaLabel: 'Education section', link: '/education' },
  { label: 'Work', ariaLabel: 'Work Experience', link: '/work-experience' },
  { label: 'Skills', ariaLabel: 'Skills and tools used', link: '/skills' },
  { label: 'About', ariaLabel: 'About me', link: '/about-me' },
  {
    label: 'Courses',
    ariaLabel: 'Relevant courses',
    link: '/relevant-courses',
  },
];

const socialItems = [
  { label: 'Email', link: 'nahom@berhane.no' },
  { label: 'GitHub', link: 'https://github.com/Nahom101-1' },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/nahom-berhane-19ab84233/',
  },
];

export function Navbar() {
  return (
    <div style={{ height: '100vh', background: '#1a1a1a' }}>
      <StaggeredMenu
        position='left'
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor='#fff'
        openMenuButtonColor='#fff'
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        // logoUrl='/path-to-your-logo.svg'
        accentColor='#ff6b6b'
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />
    </div>
  );
}
