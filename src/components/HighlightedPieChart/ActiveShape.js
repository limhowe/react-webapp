import React from 'react';
import { Sector } from 'recharts';

type Props = {
  cx: number,
  cy: number,
  midAngle: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
  fill: string,
  payload: string,
  percent: number,
  value: number
}

export default function ActiveShape(props: Props) { // eslint-disable-line
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, percent } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * 45);
  const cos = Math.cos(-RADIAN * 45);
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 10) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  const ey = my;

  return (
    <g>
      <text x={ ex } y={ ey } textAnchor="middle" fill="#333">{`${ Math.round(percent * 100) }%`}</text>
      <Sector cx={ cx } cy={ cy } startAngle={ startAngle } endAngle={ endAngle } innerRadius={ innerRadius - 3 } outerRadius={ outerRadius } fill={ fill } />
    </g>
  );
}
