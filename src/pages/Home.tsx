import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      Halaman Home
      <div>
        <Link to="/contact">go to contact</Link>
      </div>
    </div>
  );
};

export default Home;
