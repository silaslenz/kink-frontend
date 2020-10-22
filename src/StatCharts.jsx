import React from "react";
import axios from "axios";

import {Cell, Pie, PieChart, Tooltip} from "recharts";
import Label from "recharts/lib/component/Label";

let renderLabel = function (entry) {
    return entry.name;
};
const COLORS = ["#54B399", "#6092C0", "#D36086", "#9170B8", "#CA8EAE", "#D6BF57"];

export default class StatCharts extends React.Component {
    state = {
        data: [],
        savings: 0,
        stats: 0,
        color: "grey"
    };

    componentDidMount() {
        axios
            .get(`http://localhost:8080/stats/${this.props.from}/${this.props.to}`)
            .then((res) => {
                const stats = res.data;
                let data = [];
                this.setState({stats});
                let color;
                if (parseFloat(stats.total) < 0) color = "#BD271E";
                else color = "rgba(0, 0, 0, 0.87)";
                this.setState({stats, color});

                for (const key in stats) {
                    if (stats[key] < 0 && key !== "total" && key !== "Savings") {
                        console.log(key, stats[key]);
                        data.push({name: key, value: Math.abs(stats[key])});
                    }
                }
                console.log(data);
                this.setState({data});
                console.log(this.state);
            });
    }

    render() {
        return (
            <PieChart width={400} height={300}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={this.state.data}
                    cx={200}
                    cy={150}
                    outerRadius={90}
                    innerRadius={70}
                    label={renderLabel}
                >{
                    this.state.data.map((entry, index) => <Cell key={`cell-${index}`}
                                                                fill={COLORS[index % COLORS.length]}/>)
                }
                    <Label value={this.state.stats.total} position="center" fontSize={20} fill={this.state.color}/></Pie>
                <Tooltip/>
            </PieChart>
        );
    }
}
