import heroImage from "../../Components/assets/hero.png";
import { AuthProvider } from "../../Context/Store";
import Footer from "../../Pages/Footer/Footer";
import Loader from "../../Pages/Loader/Loader";
import BlogCard from "../blogCards/BlogCard";
const Home = () => {
  const { loading } = AuthProvider();
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[85vh]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-screen">
            <div className="hero-image mb-10">
              <img src={heroImage} alt="hero-image" className="w-full" />
            </div>

            <div className="flex justify-center">
              <BlogCard />
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Home;
