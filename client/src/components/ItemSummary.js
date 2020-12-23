import React, { useState, useEffect } from "react";
import CountTable from "./CountTable";
import LoaderSpinner from "./LoaderSpinner";

export default function ItemSummary(_props) {
  let [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let url = "/api/item";
      let res = await fetch(url);
      if (res.status === 200) {
        let data = await res.json();
        setSummary(data.itemSummary);
      }
    }
    fetchData();
  }, []);
  if (!summary) return <LoaderSpinner />;

  return (
    <>
      <div className="container text-center">
        <h1 className="text-center">Warehouse Item Summary</h1>
        <div className="item-summary-container text-center padding">
          <CountTable codeCount={summary} />
        </div>
      </div>
    </>
  );
}
