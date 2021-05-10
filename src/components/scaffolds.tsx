import tw from 'twin.macro';
import React from 'react';
import { Link } from 'gatsby';

export const BtnPrimary = tw.a`
  bg-blue-lapis hover:bg-blue-sky active:bg-yellow border-0 text-h4 text-white font-extrabold py-3 px-6 rounded-full cursor-pointer no-underline inline-block
`;

export const BtnLinkPrimary: React.FC<{
  style?: React.CSSProperties;
  className?: string;
  to?: string;
}> = ({ children, style, className, to }) => (
  <Link
    tw="text-center bg-blue-lapis hover:bg-blue-sky active:bg-yellow border-0 text-white font-semibold py-3 px-6 rounded-full cursor-pointer no-underline inline-block"
    to={to}
    style={style}
    className={className}
  >
    {children}
  </Link>
);
