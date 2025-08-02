import PlacesDashboard from '../components/PlacesDashboard';

const Home = () => {
  return (
    <>
      <title>HBnB | Home</title>
      <meta property="og:title" content="HBnB | Home" />
      <meta
        name="description"
        content="Welcome to HBnB, your home away from home."
      />
      <meta
        property="og:description"
        content="Welcome to HBnB, your home away from home."
      />
      <div className="container">
        <PlacesDashboard />
      </div>
    </>
  );
};

export default Home;
