import "./barChart.css"

const BarChart = () => {
  return (
    <div>
      <table className="bar-chart-container">
        <tbody>
          {/* table row for playerX */}
          <tr id="x-bar">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="active"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>


          {/* table row for playerO */}
          <tr id="o-bar">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="active"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default BarChart;
