
import type { SVGProps } from 'react';

export function FuturisticLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5" // Adjusted stroke width for a slightly cleaner look
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Outer Hexagonal Shield Shape */}
      <path d="M12 2L4 6v12l8 4 8-4V6L12 2z" />
      
      {/* Inner "Circuit/Network" Lines - Stylized 'B' or abstract pattern */}
      <path d="M12 22V17" />
      <path d="M12 17H7l-3-3" />
      <path d="M12 17H17l3-3" />

      <path d="M12 7V2" />
      <path d="M12 7h5l2-2.5" />
      <path d="M12 7H7L5 4.5" />
      
      {/* Central Element / Core */}
      <path d="M12 14a2 2 0 0 0-2-2h-1" />
      <path d="M12 14a2 2 0 0 1 2-2h1" />
      <path d="M12 10a2 2 0 0 0-2 2v0" />
       <path d="M12 10a2 2 0 0 1 2 2v0" />

      {/* Small nodes/dots to enhance tech feel */}
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="var(--background)" strokeWidth="0.5" />
      <circle cx="7" cy="17" r="0.7" fill="currentColor" />
      <circle cx="17" cy="17" r="0.7" fill="currentColor" />
      <circle cx="7" cy="7" r="0.7" fill="currentColor" />
      <circle cx="17" cy="7" r="0.7" fill="currentColor" />
      <circle cx="4" cy="14" r="0.7" fill="currentColor" />
      <circle cx="20" cy="14" r="0.7" fill="currentColor" />
      <circle cx="5" cy="4.5" r="0.7" fill="currentColor" />
      <circle cx="19" cy="4.5" r="0.7" fill="currentColor" />

    </svg>
  );
}
