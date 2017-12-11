import React, {Component, Children} from 'react';
import $ from 'jquery';

class Stepper extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll(event) {
        const elms = $('.steps');
        const stepArr = []
        elms.map((steps)=>{
            stepArr.push(elms[steps].id);
        })
        const bodyRect = document.body.getBoundingClientRect().top
        
        stepArr.map(function(id,index){
            const domElm = document.getElementById(id).getBoundingClientRect()
            const elmTop = domElm.top
            const scrollPos = $(document).scrollTop()
            let elmOffsetY = elmTop - bodyRect
           // console.log(id,"scrollPos:"+scrollPos,domElm.height,$('#step3').offset())
            if(elmOffsetY <= scrollPos ){
                $('#stepper'+index).addClass('active');
                $('#stepper'+index).siblings().removeClass('active');
            }
        })
    }

    render() {
        const {titles} = this.props
        return (
                <div className="stepper col-lg-10 col-sm-12 col-center" >
                    <div className="stepper-row">
                        {titles && titles.map(function(value,index){
                            return (
                                <div className={index === 0 ? "stepper-step active" : "stepper-step" } key={index} id={"stepper"+index}>
                                    {value.html ? [
                                        
                                        <span key={1} dangerouslySetInnerHTML={{__html: value.html}}></span>,
                                        
                                        <div key={2} ><a className="btn btn-circle"></a></div>
                                    ]:[
                                        <span key={1}>
                                                <font className='hidden-lg-down'>
                                                {value.en}
                                                </font>
                                                {value.cn}
                                            </span>,
                                        <div key={2} ><a  className="btn btn-circle"></a></div>
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