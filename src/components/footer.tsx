import React from 'react';
import 'twin.macro';
import { FluidObject } from 'gatsby-image';
import { DateTime } from 'luxon';

interface FooterProps {
  logo?: FluidObject;
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer tw="text-white">
      <div tw="bg-blue-lapis px-4">
        <div tw="container py-10 text-sm">
          <div tw="lg:mx-32">
            <div>
              Copyright &copy; {DateTime.local().year} Yayasan Al Amanah
              <br />
              Jl. Kawaluyaan Indah I
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
