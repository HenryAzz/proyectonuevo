import PropTypes from "prop-types";
import "./PieChart.css";

const PieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="pie-chart">
      <svg className="chart" viewBox="0 0 32 32">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const circumference = 2 * Math.PI * 15;
          const offset = circumference - (circumference * percentage) / 100;

          return (
            <circle
              key={index}
              className="chart-slice"
              cx="16"
              cy="16"
              r="15.9155"
              fill="transparent"
              stroke={item.color}
              strokeWidth="3"
              strokeDasharray={`${percentage} ${circumference}`}
              strokeDashoffset={offset}
            />
          );
        })}
      </svg>

      <ul className="chart-legend">
        {data.map((item, index) => (
          <li key={index} className="chart-legend-item">
            <span className="legend-color" style={{ backgroundColor: item.color }}></span>
            <span className="legend-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PieChart;
