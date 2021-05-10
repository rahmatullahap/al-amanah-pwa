import React from 'react';
import 'twin.macro';
import { Link } from 'gatsby';

const BaseLayout: React.FC = () => (
  <div>
    <section tw="flex justify-center items-center text-center">
      <div>
        <h2>Halaman Tidak Ditemukan</h2>
        <Link to="/">kembali ke beranda</Link>
      </div>
    </section>
  </div>
);

export default BaseLayout;
