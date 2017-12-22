import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';

class DialogBox extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
          <button
            label="Cancel"
            primary={true}
            onClick={this.handleClose}
          />
        ];

        return (
            <div>
                <a label="Dialog" onClick={this.handleOpen}>ss</a>
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}
export default DialogBox;