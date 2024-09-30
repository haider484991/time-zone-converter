// src/pages/about.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Head>
        <title>About TimeZone Converter</title>
        <meta name="description" content="Learn more about TimeZone Converter, a web app for converting time between different time zones." />
        <meta name="keywords" content="Timezone Converter, Timezone Converter USA, Time Conversion" />
      </Head>
      <Header />
      <div className="container mx-auto p-6 text-white">
        <h1 className="text-4xl font-bold mb-6">About TimeZone Converter</h1>
        <p className="text-lg mb-4">
          TimeZone Converter is a simple web application designed to help users convert time
          between different time zones with ease. The intuitive interface ensures that you can
          manage your schedule across multiple cities without confusion.
        </p>
        <p className="text-lg">
          Whether you're working with teams across the globe or simply scheduling a call with a
          friend in another country, our app simplifies the process. Just select your time zones
          and see the current time across various cities.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
