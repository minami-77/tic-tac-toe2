import "./barChart.css"
import { useState, useEffect } from "react";

const BarChart = ({score}) => {
  const [tds, setTds] = useState(Array(20).fill("normal"));
  // const [oTds, setOTds] = useState(Array(20).fill("normal"));

  useEffect(()=>{
    let updateTds = Array(20).fill("normal");
    // const updateOTds = Array(20).fill("normal");

      if (score == 0){
        updateTds= Array(20).fill("normal");
      } else if (score > 0){
        let plus = Math.floor(score / 10);
        for (let i = 11; i <= 10 + plus; i++) {
          console.log(`${i}, 10 + ${plus}`);
          updateTds[i] = "active-plus";
        }
      } else {
        let minus = Math.floor(score / -10);
        for (let i = 10; i > 10 - minus; i--) {
          console.log(`${i}, 10 - ${minus}`);
          updateTds[i] = "active-minus";
        }
      }
      setTds(updateTds);

    // if (scoreO >= 0){
    //   let plusO = Math.floor(scoreO / 10);
    //   for (let i = 11; i <= 10 + plusO; i++) {
    //     console.log(`${i}, 10 + ${plusO}`);
    //     updateOTds[i] = "active-plus";
    //   }
    // } else {
    //   let minusO = Math.floor(scoreO / -10);
    //   for (let i = 10; i > 10 - minusO; i--) {
    //     console.log(`${i}, 10 - ${minusO}`);
    //     updateOTds[i] = "active-minus";
    //   }
    // }
    // setOTds(updateOTds);

  }, [score])

  return (
    <div>
      <table className="bar-chart-container">
        <tbody>
          {/* table row for playerX */}
          <tr id="x-bar">
            {tds.map((td, index)=>
              <td key={index} className={td}></td>
            )}
          </tr>

          {/* table row for playerO */}
          {/* <tr id="o-bar"> */}
          {/* {oTds.map((oTd, index)=>
              <td key={index} className={oTd}></td>)
            }
          </tr> */}

        </tbody>
      </table>
    </div>
  )
}

export default BarChart;
