import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Hero() {

    const data = [
        { name: "G1", value: 200 },
        { name: "G2", value: 400 },
        { name: "G3", value: 100 },
        { name: "G4", value: 700 },
        { name: "G5", value: 900 },
    ]
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </div>
                </div>
            </div>

        </>
    )
}
