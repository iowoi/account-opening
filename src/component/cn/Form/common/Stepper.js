import React, {Component, Children} from 'react';
import $ from 'jquery';

class Stepper extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('click', this.handleClick);
        
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('keydown', this.handleKeydown);
        window.removeEventListener('click', this.handleClick);
        
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
        return (
                <div className="stepper col-lg-10 col-sm-12 col-center" >
                    <div className="stepper-row">
                        {titles && titles.map(function(value,index){
                            return (
                                <div className={index === 0 ? "stepper-step active" : "stepper-step" } key={index} id={"stepper"+index}>
                                    {value.html ? [
                                        
                                        <div key={1} dangerouslySetInnerHTML={{__html: value.html}}></div>,
                                        
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