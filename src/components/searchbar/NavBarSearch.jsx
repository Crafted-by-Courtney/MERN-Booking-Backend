import React from "react";
import { Autocomplete, Button, Select } from "@mantine/core";
import { IoFilter, IoSearch } from "react-icons/io5";
import "./NavBarSearch.css"; // Import the CSS file
import { DateRangePicker } from "@mantine/dates";

export default function NavBarSearch() {
  return (
    <div className="navbar-search-container">
      <div className="filter-button">
        <Button className="filter-button-inner" size="md">
          <IoFilter />
        </Button>
      </div>
      <div className="autocomplete">
        <Autocomplete
          placeholder="Where"
          data={["1", "China", "Cuba", "California"]}
          classNames={{
            icon: "p-3",
          }}
          icon={<IoSearch />}
          size="lg"
        />
      </div>
      <div className="date-picker">
      <DateRangePicker placeholder="Date" size="lg" />
      </div>
      <div className="select">
        <Select
          size="lg"
          placeholder="Guests"
          clearable
          data={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: "5" },
            { value: 6, label: "6+" },
          ]}
        />
      </div>
      <div className="search-button">
        <Button className="search-button-inner" size="md">
          Search
        </Button>
      </div>
    </div>
  );
}
