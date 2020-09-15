import Head from "next/head";

type CornerType = "eat" | "know" | "see" | "hear";
type CornerPosition = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

const Corner: React.FC<{ type: CornerType; position: CornerPosition }> = ({
  type = "eat",
  position = "topLeft",
}) => {
  const size = "@8x";
  const getImg = (name: string) => `/icons/${name}${size}.png`;

  const imgs = {
    eat: getImg("shop"),
    know: getImg("cooking"),
    see: getImg("colander"),
    hear: getImg("fried-egg"),
  };
  const pos = {
    topLeft: "top-0 left-0",
    topRight: "top-0 right-0",
    bottomLeft: "bottom-0 left-0",
    bottomRight: "bottom-0 right-0",
  };
  return (
    <div
      className={`absolute border border-2 border-blue-700 rounded-md bg-gray-100 m-4 w-32 ${pos[position]}`}
    >
      <img src={imgs[type]} />
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-red-100">
      <Head>
        <title>Okome Web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-screen bg-blue-200">
        <Corner type="eat" position="topLeft" />
        <Corner type="hear" position="topRight" />
        <Corner type="know" position="bottomLeft" />
        <Corner type="see" position="bottomRight" />
      </div>
    </div>
  );
}
