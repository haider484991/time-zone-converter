import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
     <Head>
        <title>Contact TimeZone Converter</title>
        <meta name="description" content="Contact TimeZone Converter, a web app for converting time between different time zones." />
        <meta name="keywords" content="Timezone Converter, Timezone Converter USA, Time Conversion" />
      </Head>
      <Header />
      <div className="container mx-auto p-6 text-white">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg mb-4">For inquiries or support, please contact us:</p>
        <p>Email: support@timezoneconverter.com</p>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
