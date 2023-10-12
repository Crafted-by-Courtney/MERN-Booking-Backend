// Cards.js or Cards.jsx
import useSWR from "swr";
import House from "./House"; // Assuming you have a House component

export default function Cards() {
  // Fetch data from the API using SWR (a React hook for data fetching)
  const { data: houses } = useSWR("/api/house/getAll");

  return (
    <div className="pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {houses?.map((house) => (
          <House
            key={house.id} // Add a unique key for each card
            country={house.country}
            price={house.price}
            address={house.address}
          />
        ))}
      </div>
    </div>
  );
}
