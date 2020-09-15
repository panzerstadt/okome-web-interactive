import Head from "next/head";
import { useItemCatalogue } from "../services/useItemCatalogue";

const Item = ({ img, title }) => {
  return (
    <div className="w-full h-full">
      <img src={img} alt={title} />
      <p>{title}</p>
    </div>
  );
};

const Selections = () => {
  // get selections from square API here
  const [items, setItems] = useItemCatalogue();

  return items.map((item) => {
    return <Item img={item.image} title={item.name} />;
  });

  return <p>{JSON.stringify(items[0], null, 2)}</p>;
};

const Catalogue = () => {
  return (
    <div>
      <Head>
        <title>Catalogue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-screen">
        <div className="relative flex flex-col items-center justify-end w-full h-full">
          <h1 className="absolute top-0 mt-16 text-5xl">なん合？</h1>
          <img
            className="object-cover w-full md:w-1/2"
            src="/images/okomekun-top.png"
          />
        </div>

        <Selections />
      </div>
    </div>
  );
};

export default Catalogue;
