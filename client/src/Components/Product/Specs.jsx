import React from 'react'

const Specs = ({specs,SetSpecs}) => {
    const handleSpecsChange = (e) => {
        const identifiers = e.target.id.split("-");
        if (identifiers[0] === "name") {
          SetSpecs((prev) => {
            const index = identifiers[1];
            const obj = {
              name: e.target.value,
              detail: prev[index].detail,
            };
            const newSpecs = [...prev];
            newSpecs[index] = obj;
            return newSpecs;
          });
        } else {
          SetSpecs((prev) => {
            const index = identifiers[1];
            const obj = {
              name: prev[index].name,
              detail: e.target.value,
            };
            const newSpecs = [...prev];
            newSpecs[index] = obj;
            return newSpecs;
          });
        }
      };

      const addRows = (e) => {
        const obj = {
          name: "",
          detail: "",
        };
        SetSpecs((prev) => [...prev, obj]);
      };
      const returnSpecRows = (n) => {
        return (
          <>
            <tr>
              <td className="w-25">
                <input
                  className="form-control"
                  id={`name-${n}`}
                  onChange={handleSpecsChange}
                  value={specs[n].name}
                  required={n<4 ? true:false}
                />
              </td>
              <td className="w-75">
                <input
                  className="form-control"
                  id={`detail-${n}`}
                  onChange={handleSpecsChange}
                  value={specs[n].detail}
                  required={n<4 ? true:false}
                />
              </td>
            </tr>
          </>
        );
      };
    return (
        <div className="form-group">
        <label>Specifications</label>
        <table className="spec-table w-100">
          <thead>
            <tr>
              <td className="spec-table-header">Name</td>
              <td className="spec-table-header">Details</td>
            </tr>
          </thead>
          <tbody>{specs.map((e, index) => returnSpecRows(index))}</tbody>
        </table>
        <button className="button mt-3" type="button" onClick={addRows}>
          Add
        </button>
      </div>
    )
}

export default Specs
