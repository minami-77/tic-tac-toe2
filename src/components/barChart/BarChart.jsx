import "./barChart.css"
import { useState, useEffect } from "react";

const BarChart = ({score, player}) => {
  const [tds, setTds] = useState(Array(20).fill("normal"));

  useEffect(()=>{
    //第1引数(td = table data)
    let updateTds = Array(20).fill("normal");

      // get props score from Board
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
  //第2引数
  }, [score])

  return (
    <div>
      <table className="bar-chart-container">
        <tbody>
          {/* get props player from Board */}
          <tr className= {player ==='X' ? 'x-bar' :'o-bar'}>
            {tds.map((td, index)=>
              <td key={index} className= {td}></td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default BarChart;
