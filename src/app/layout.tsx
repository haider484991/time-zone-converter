// src/app/layout.tsx
import React from 'react';
import '../app/styles/globals.css';
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Time Zone Converter',
  description: 'A time zone converter and world clock app.',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="google-site-verification" content="SD5O9YMVjMidX_2nXukZqSKJyRO3ChLAZhedDjYYNBc" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;