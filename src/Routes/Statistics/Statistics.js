import React, { Component } from 'react';
import RedZoneContext from '../../RedZoneContext';
import { Bar, Doughnut } from 'react-chartjs-2';
import './Statistics.css';


let check = true;
export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
              'Credit Cards or Loans',
              'Entertainment',
              'Food',
              'Housing and Utilities',
              'Transportation',
              'Travel',
              'Family',
              'Personal care and Clothing',
              'Other'
            ],
            expenses: null,
            originalExpenses: null,
            red_zone_amount: null,
            RedZoneAlert: false,
        };
        check = true;
    }

    static contextType = RedZoneContext;
 
    makeAlertTrue () {
        this.setState({
            RedZoneAlert: true,
        })
    }

    makeAlertFalse () {
        this.setState({
            RedZoneAlert: false,
        })
    }
    
    
    componentDidUpdate(prevProps, prevState) {
        if (this.hasExpenses()) {
            if (
                prevState.originalExpenses !== this.context.expenses &&
                !this.state.originalExpenses
            ) {
                this.setExpenses();
            } else {
            }
        }
    }

    componentDidMount() {
        if (this.hasExpenses()) {
            this.setExpenses();
        }
    }

    hasExpenses() {
        return this.context && Array.isArray(this.context.expenses);
    }

    setExpenses() {
        this.setState({
            originalExpenses: this.context.expenses,
            expenses: this.state.expenses || this.context.expenses
        });
    }

    render() {
        let mystyle = {
            backgroundColor: "red",
            padding: "10px",
            visibility: "visible"
          };
        let data1 = {
            labels: this.state.categories,
            datasets: [
                {
                    label: " Amount spent per category",
                    backgroundColor: [
                        "rgb(210,105,30)",
                        "rgb(220,20,60)",
                        "rgb(255,140,0)",
                        "rgb(255,255,0)",
                        "rgb(34,139,34)",
                        "rgb(64,224,208)",
                        "rgb(0,0,205)",
                        "rgb(128,0,128)",                    
                    ],
                    borderColor: "black",
                    data: [],
                    padding: 25,
                    marginTop: 95,
                }
            ]
        };
        let barChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                }],
            },
        }
        let data2 = {
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        "rgb(210,105,30)",
                        "rgb(220,20,60)",
                        "rgb(255,140,0)",
                        "rgb(255,255,0)",
                        "rgb(34,139,34)",
                        "rgb(64,224,208)",
                        "rgb(0,0,205)",
                        "rgb(128,0,128)",                      
                    ]
                }
            ],
            labels: this.state.categories,
            cutoutPercentage: 70,
        };
        const option = {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        let dataset = data.datasets[tooltipItem.datasetIndex];
                        let meta = dataset._meta[Object.keys(dataset._meta)[0]];
                        let total = meta.total;
                        let currentValue = dataset.data[tooltipItem.index];
                        return parseFloat((currentValue / total) * 100).toFixed(1) + "%";
                    },
                    title: function(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    }
                }
            },
            maintainAspectRatio: true,
        };
        let total_amount_Spend = 0;
        let count_entries = 0;
        let money_left = 0;
        if (this.state.expenses && check) {
            let sum_of_each_category = [];
            let total_entries_of_each_category = [];
            this.state.categories.forEach((checker, index) => {
                let sum = 0,
                    count = 0;
                this.state.expenses.forEach(category1 => {
                    if (checker.toLowerCase().includes(category1.style.toLowerCase())) {
                        sum += Number(category1.amount);
                        count += 1;
                    }
                });
                sum_of_each_category.push(sum);
                total_amount_Spend += sum;
                total_entries_of_each_category.push(count);
            });
            total_entries_of_each_category.forEach(val => {
                count_entries += val;
            });
            sum_of_each_category.forEach(val => {
                data1.datasets[0].data.push(val);
                let temp = (val / total_amount_Spend) * 100;
                data2.datasets[0].data.push(temp.toFixed(0));
            });
            check = false;
        }

        money_left = this.context.red_zone_amount-total_amount_Spend;

        if( total_amount_Spend > this.context.red_zone_amount ){
            mystyle = {
                backgroundColor: "rgb(206, 27, 27)",
                padding: "10px",
                visibility: "visible",
                fontSize: "40px"
              };
        }
        if( total_amount_Spend <= this.context.red_zone_amount ){
             mystyle = {
                padding: "0px",
                visibility: "hidden",
              };
        }
        
        return (
            
            this.state.expenses && (
                <div className='statistic'>
                    <div className = 'RedZoneAlert'  style={mystyle}>
                    <h3 className ="URNTheRZ">You are in the RedZone</h3>
                    </div>
                    <p className='stats stats0'>
                        ${this.context.red_zone_amount}
                        <span className='statTitle'>Red Zone Amount</span>
                    </p>
                    <p className='stats stats1'>
                        {count_entries}
                        <span className='statTitle'>Total Entries</span>
                    </p>
                    <p className='stats stats2'>
                        ${total_amount_Spend.toFixed(2)}
                        <span className='statTitle'>Total Expenses</span>
                    </p>
                    <p className='stats stats3'>
                        ${(total_amount_Spend / count_entries).toFixed(2)}
                        <span className='statTitle'>Expense Average</span>
                    </p>
                    <p className='stats stats4'>
                        ${money_left}
                        <span className='statTitle'>Money left to spend</span>
                    </p>
                    <div className='charts__container'>
                    <div className='charts doughnutChart'>
                            <Doughnut
                                data={data2}
                                options={option}
                            />
                        </div>
                        <div className='charts barChart'>
                            <Bar
                                data={data1}
                                options={barChartOptions}
                            />
                        </div>
                    </div>
                </div>
            )
        );
    }
}