
import Link from 'next/link';

const headingStyle = {
  fontSize: "2rem", // You can adjust the font size as needed
  fontWeight: "bold", // This makes the text bold
  textAlign: "center", // Center the text if desired
  margin: "40px 0", 
  color:"blue"
};

const Login = () => {

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen">
    <h1 style={headingStyle}>DIGITIZED WORK TRACKER</h1>
      <p>Please log in using Single Sign-On:</p>
      <Link href="http://localhost:5000/auth/google"
        className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700">
          Log In with SSO
      </Link>
    </div>
    
  );
};

export default Login;

