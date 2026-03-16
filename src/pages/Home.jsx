import picHero from "../assets/images/hero.png";
import Items from "../components/Items";

const Home = ({ data, title }) => {
  //   console.log(data); //{count: 32, offers: Array(32)}
  //   console.log(data.offers); // {_id: '69b178197659fbfd4f9ebe26', product_name: 'Vestido', product_description: 'Vestido camisero estampado...}
  //  console.log(data); // {_id: '69b178197659fbfd4f9ebe26', product_name: 'Vestido',

  return (
    <main className="homepage">
      <section className="hero">
        <img src={picHero} alt="image de fond" />
        {/* <div>
          Prêts à faire du tri dans vos placards ?
          <div>Commencer à vendre</div>
        </div> */}
      </section>

      <Items data={data} />
    </main>
  );
};

export default Home;
