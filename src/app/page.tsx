// src/app/page.tsx
import Head from 'next/head';
import React from 'react';
import WorldClock from './components/WorldClock';
import Header from '../app/components/Header';
import Footer from '../app/components/Footer';

const articles = [
  {
    title: "Understanding Time Zones: A Comprehensive Guide",
    description: "Explore the concept of time zones, their history, and how they affect our daily lives.",
    url: "/articles/understanding-time-zones",
  },
  
];

const HomePage = () => {
  return (
    <>
      <Head>
        <title>TimeZone Converter - Convert Time Between Different Zones</title>
        <meta name="description" content="Easily convert time between different time zones with our user-friendly TimeZone Converter. Accurate and reliable time conversion for users worldwide." />
        <meta name="keywords" content="Timezone Converter, Time Conversion, World Clock, Convert Time, UTC Time" />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="TimeZone Converter - Convert Time Between Different Zones" />
        <meta property="og:description" content="Easily convert time between different time zones with our user-friendly TimeZone Converter. Accurate and reliable time conversion for users worldwide." />
        <meta property="og:image" content="/images/og-image.jpg" /> {/* Replace with your actual image */}
        <meta property="og:url" content="/" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Timezone Converter",
          "description": "A user-friendly timezone converter that allows you to convert time between different timezones, view world clocks, and check the current weather in trending cities.",
          "url": "https://time-zone-converter-xi.vercel.app/",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Timezone Converter App",
            "operatingSystem": "Web",
            "applicationCategory": "Utility",
            "description": "An application for converting time across different timezones and checking the weather in various cities.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock"
            }
          },
          "publisher": {
            "@type": "Organization",
            "name": "HA Tools"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://time-zone-converter-xi.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
        `}} />
        


      </Head>
      <div>
        <Header />
        <main>
          <h1 className="text-4xl font-bold text-center my-10">Welcome to the TimeZone Converter</h1>
          <p className="text-lg text-center mb-5">Convert time easily and accurately between different time zones. Whether you're scheduling meetings or planning travel, our tool has you covered.</p>
          <WorldClock />

          <section className="my-10">
            <h2 className="text-3xl font-bold text-center mb-5">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article, index) => (
                <article key={index} className="bg-gray-800 p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold">
                    <a href={article.url} className="text-blue-400 hover:underline">
                      {article.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-gray-300">{article.description}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
