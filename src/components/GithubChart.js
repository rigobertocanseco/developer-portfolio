import React, { PureComponent } from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer, Sector} from 'recharts';
import * as PropTypes from "prop-types";


//const RADIAN = Math.PI / 180;

/*
const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, outerRadius, fill, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <>
      {percent >= 0.05 && (
        <g>
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#999">{`${value}`}</text>
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#FFFFFF">
          {`${(percent * 100).toFixed(0)}%`}
          </text>
        </g>
    )}
    </>
  );
};
*/
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#FFFFFF"}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 20} dy={8} textAnchor="middle" fill={"#FFFFFF"}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 5}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
        {/*
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#999">{`${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#FFFFFF">
          {`${(percent * 100).toFixed(0)}%`}
        </text>*/}
      </g>
  );
};

export default class GithubChart extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }

    return null;
  };

  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { props: { data } } = this;

    return (
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={105}
            color="#FFFFFF"
            fill="#000000"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
            //labelLine={false}
            //label={renderCustomizedLabel}
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} ></Cell>)
            }
          </Pie>
          {/*<Legend layout={"vertical"} align={"right"} verticalAlign={"top"}/>*/}
        </PieChart>
      </ResponsiveContainer>
    );
  }
}