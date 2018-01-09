import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

class DialogBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: props.display
        };
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props.display !== nextProps.display){
            this.setState ({
                open: nextProps.display
            })
        }
    }

    handleClose = () => {
        this.setState({open: false});
        this.props.togglePopUp();
    };

    render() {
        const actions = [
          <button
            label="Cancel"
            className="btn btn-default"
            onClick={this.handleClose}
          >Close</button>
        ];
        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        // title="Dialog With Actions"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                        {this.props.children}
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default DialogBox;