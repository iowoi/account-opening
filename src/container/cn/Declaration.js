import React, {Component} from 'react';
import Declaration from '../../component/cn/Form/Declaration';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
    sendForm:(data) => {
        dispatch(sendForm(data))
    }
})


const CnDeclaration = connect(
    state => {
        const initialValues = {
            AgreeAccuracyAndNotification: '1',
            AgreeKVBTermsConditions: '1',
            AgreeRisks: '1',
            AgreePrivacy: '1',
            AgreeOther: '1'            
        }
        const source =  state.info.source
        const formData = state.form
        
        return {source,formData,initialValues};
    },
    mapDispatchToProps
)(Declaration)
  

export default CnDeclaration;