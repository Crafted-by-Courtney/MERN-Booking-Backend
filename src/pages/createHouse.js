import HouseCreate from "components/House/HouseCreate";
import Navbar from "components/Navbar";
import Head from "next/head";


export default function CreateHouse(props) {
    return(
        <div>
            <Head>
                <title>Create</title>
                <meta name="adasd" contet="tasd"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>

            <HouseCreate/>

        </div>
    )
}