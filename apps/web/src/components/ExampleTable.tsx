import { useEffect, useState } from "react";
import axios from "axios";

export function ExampleTable() {
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
      setData(result.data);
    })();
  }, []);
  return <h1>Table</h1>;
}
