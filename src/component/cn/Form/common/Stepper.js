import React, {Component, Children} from 'react';

class Stepper extends Component {


    render() {
        console.log(this.props)
        const {titles} = this.props
        return (
                <div className="stepper col-lg-10 col-sm-12 col-center" >
                    <div className="stepper-row">
                        {titles && titles.map(function(value,index){
                            return (
                                <div className={index === 0 ? "stepper-step active" : "stepper-step" } key={index} id={"stepper"+index}>
                                    {value.html ? [
                                        
                                        <span key={1} dangerouslySetInnerHTML={{__html: value.html}}></span>,
                                        
                                        <div><a  key={2} className="btn btn-circle"></a></div>
                                    ]:[
                                            <span key={1}>
                                                <font className='hidden-lg-down'>
                                                {value.en}
                                                </font>
                                                {value.cn}
                                            </span>,
                                        <div><a  key={2} className="btn btn-circle"></a></div>
                                        ]
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
        )
    }
}

export default Stepper;