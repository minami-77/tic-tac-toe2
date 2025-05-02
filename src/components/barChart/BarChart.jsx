import "./barChart.css"
import { useState, useEffect } from "react";

const BarChart = ({scoreX, scoreO}) => {
  const [xTds, setXTds] = useState(Array(20).fill("normal"));
  const [oTds, setOTds] = useState(Array(20).fill("normal"));

  useEffect(()=>{
    const updateXTds = Array(20).fill("normal");
    const updateOTds = Array(20).fill("normal");

    if (scoreX >= 0){
      if (scoreX!==0){
        let plusX = Math.floor(scoreX / 10);
          for (let i = 10; i <= 10 + plusX; i++) {
          updateXTds[i] = "active-plus";
        } else {
          let minusX = Math.floor(scoreX / -10);
          for (let i = 10; i >= 10 - minusX; i--) {
            updateXTds[i] = "active-minus";
          }
        }
      }
      setXTds(updateXTds);
    }

    if (scoreO >= 0){
      let plusO = Math.floor(scoreO / 10);
      for (let i = 10; i <= 10 + plusO; i++) {
        updateOTds[i] = "active-plus";
      }
    } else {
      let minusO = Math.floor(scoreO / -10);
      for (let i = 10; i >= 10 - minusO; i--) {
        updateOTds[i] = "active-minus";
      }
    }
    setOTds(updateOTds);

  }, [scoreX, scoreO])

  return (
    <div>
      <table className="bar-chart-container">
        <tbody>
          {/* table row for playerX */}
          <tr id="x-bar">
            {xTds.map((xTd, index)=>
              <td key={index} className={xTd}></td>)
            }
          </tr>

          {/* table row for playerO */}
          <tr id="o-bar">
          {oTds.map((oTd, index)=>
              <td key={index} className={oTd}></td>)
            }
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default BarChart;
