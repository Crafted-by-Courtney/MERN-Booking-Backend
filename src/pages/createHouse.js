import HouseCreate from "components/House/HouseCreate";
import Navbar from "components/NavBar";
import Head from "next/head";


export default function CreateHouse(props) {
    return(
        <div>
            <Head>
                <title>Create</title>
                <meta name="adasd" content="tasd"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>

            <HouseCreate/>

        </div>
    )
}