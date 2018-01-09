import React, {Component, Children} from 'react';
import $ from 'jquery';

class Stepper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCN : WEB_LANG('cn')
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('keydown', this.handleKeydown);
      //  $('input').addEventListener('click', this.handleClick);
        
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('keydown', this.handleKeydown);
      // d  window.removeEventListener('click', this.handleClick);
        
    }
    handleClick(event) {
        const id = $(event.target).parents('.steps')[0].id;    
        $('#stepper'+id).addClass('active');
        $('#stepper'+id).siblings().removeClass('active');
    }
    handleKeydown(event) {
        const id = $(event.target).parents('.steps')[0].id;
        $('#stepper'+id).addClass('active');
        $('#stepper'+id).siblings().removeClass('active');
      
    }
    handleScroll(event) {
        const elms = $('.d-block .steps');
        const headerHeight = $('header').height();
        const stepArr = [];
        elms.map((steps,index)=>{
            stepArr.push(index);
        })
       
        for(let i=0; i< stepArr.length; i++){
            const domElm = $(`.d-block .steps`).get(i).offsetTop;
            const scrollPos = $(document).scrollTop() + headerHeight + 150
            if(domElm <= scrollPos ){
                $('#stepper'+i).addClass('active');
                $('#stepper'+i).siblings().removeClass('active');
            }
        }
    }

    render() {
        const {titles} = this.props
        const {isCN} = this.state
        return (
                <div className={!isCN?"en-site stepper col-lg-10 col-sm-12 col-center":"stepper col-lg-10 col-sm-12 col-center"} >
                    <div className="stepper-row">
                        {titles && titles.map(function(value,index){
                            return (
                                <div className={index === 0 ? "stepper-step active" : "stepper-step" } key={index} id={"stepper"+index}>
                                    {value.html ? [
                                        
                                        <div key={0} dangerouslySetInnerHTML={{__html: value.html}}></div>,
                                        <div key={1} className="step"> Step {index+1}</div>,
                                        <div key={2} ><a className="btn btn-circle"></a></div>
                                    ]:[
                                        <span key={0}>
                                                <font className='hidden-lg-down'>
                                                {value.en}
                                                </font>
                                                {isCN?value.cn:null}
                                            </span>,
                                        <span key={1}  className="step">
                                            Step {index+1}
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