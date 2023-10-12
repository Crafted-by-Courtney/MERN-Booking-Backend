import HouseCreate from "components/House/HouseCreate";
import Navbar from "components/NavBar";
import Head from "next/head";

export default function CreateHouse(props) {
  return (
    <div>
      <Head>
        <title>Create</title>
        <meta name="description" content="Your description goes here" />
        <meta charSet="UTF-8" /> {/* Add the character set declaration */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <HouseCreate />
    </div>
  );
}
