// src/components/Footer.tsx
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} TimeZone Converter. All rights reserved.</p>
          <p>
            Follow us on{' '}
            <a href="#" className="text-blue-400 hover:underline">
              Twitter
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-400 hover:underline">
              LinkedIn
            </a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  