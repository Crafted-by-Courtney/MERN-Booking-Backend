import useSWR from "swr";
import House from "./House";

export default function Cards() {
  const { data: houses } = useSWR(`/api/house/getAll`);

  return (
    <div className="pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {houses?.map((house) => (
          <House
            key={house.id} // Add the key prop with a unique identifier (e.g., house.id)
            country={house.country}
            price={house.price}
            address={house.address}
          />
        ))}
      </div>
    </div>
  );
}
