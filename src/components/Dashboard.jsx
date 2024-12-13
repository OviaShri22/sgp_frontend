import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';

const data = [
  { type: 'Feedback', expertise: 'MFCS' },
  {  type: 'Complaint', expertise: 'WAD' },
  {  type: 'Information', expertise: 'C' },
  {  type: 'Doubts', expertise: 'DS' },

];

const Dashboard = () => {
  return (
    <div className="p-14 bg-white shadow-2xl rounded-lg max-w-5xl mx-auto hover:shadow-slate-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">type & expertise</h2>
      <div className="flex flex-nowrap justify-between">
        <div className="flex-3 p-8 m-4 bg-white shadow-lg rounded-lg hover:shadow-slate-700 transition-shadow duration-300 custom-width">
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            width={800}
            height={400}
          >
            <VictoryAxis
              tickValues={data.map((d, i) => i + 1)}
              tickFormat={data.map(d => d.type)}
              style={{
                axis: { stroke: '#e0e0e0' },
                ticks: { stroke: '#e0e0e0' },
                tickLabels: { fontSize: 12, fill: '#6b7280' }
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => `${x} expertise`}
              style={{
                axis: { stroke: '#e0e0e0' },
                ticks: { stroke: '#e0e0e0' },
                tickLabels: { fontSize: 9, fill: '#6b7280' }
              }}
            />
            <VictoryBar
              data={data}
              x="type"
              y="expertise"
              labels={({ datum }) => `${datum.expertise} expertise`}
              labelComponent={<VictoryTooltip />}
              style={{
                data: { fill: "#4caf50", width: 20 },
                labels: { fill: '#000000', fontSize: 12, fontWeight: 'bold' }
              }}
              cornerRadius={8}
              barWidth={30}
            />
          </VictoryChart>
        </div>
        <div className="flex-1 p-8 m-4 bg-white shadow-lg rounded-lg hover:shadow-slate-700 transition-shadow duration-300">
          <div className="flex flex-col justify-center items-start p-4">
            {data.map((d, index) => (
              <div key={index} className="bg-blue-100 p-2 mb-2 rounded-lg shadow-md w-48">
                <p className="text-gray-800 font-bold">{index + 1}. {d.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
