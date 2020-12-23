import React from "react";

export default function CountTable(props) {   // component that receives a code count summary as prop and returns a item summary table
  let { codeCount } = props;
  return (
    <>
      <div className="summary-table">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {codeCount.map((elem) => {
              return (
                <tr>
                  <td>{elem._id}</td>
                  <td>{elem.count}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </>
  );
}
