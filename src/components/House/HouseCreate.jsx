import { TextInput, Button } from "@mantine/core";
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

    try {
      const result = await axios.post("/api/house/create/createManually", values);
      console.log(result.data);
      router.push(result.data.url);
    } catch (error) {
      // Handle errors here
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => createHouse(values))}>
        <div className="grid grid-cols-2 gap-8">
          <TextInput label="Description" {...form.getInputProps("description")} />
          <TextInput label="Address" {...form.getInputProps("address")} />
          <TextInput label="Country" {...form.getInputProps("country")} />
          <TextInput label="Price" {...form.getInputProps("price")} />
          <Button
            type="submit"
            variant="filled"
            color="blue"
            loading={loading}
            fullWidth
            className="mt-10"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
