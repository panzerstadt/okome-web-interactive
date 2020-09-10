import Head from "next/head";

export default function Home() {
  return (
    <div className="bg-red-100">
      <Head>
        <title>Okome Web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-blue-200">
        <h1>okome</h1>
      </div>
    </div>
  );
}
