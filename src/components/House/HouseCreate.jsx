import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import Navbar from "components/navigation/NavBar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function HouseCreate(props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      description: "",
      address: "",
      country: "",
      price: "",
    },
  });

  async function createHouse(values) {
    setLoading(true);
    console.log(values, "test");
    try {
      const result = await axios.post(
        "/api/house/create/createManually",
        values
      );
      console.log(result.data);
      router.push(result.data.url);
    } catch (error) {}
  }

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => createHouse(values))}>
        <div className="grid grid-cols-2 gap-8">
          <TextInput
            label="description"
            {...form.getInputProps("description")}
          />
          <TextInput label="address" {...form.getInputProps("address")} />
          <TextInput label="country" {...form.getInputProps("country")} />
          <TextInput label="price" {...form.getInputProps("price")} />
          <button type="submit" className="mt-10 w-full bg-blue-500 ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}