import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default class DialogExampleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: props.message
        };
        this.open = (msg) => this.setState({
            open: true,
            message: msg || this.props.message
        });
        this.close = () => {
            this.handleClose();
        };
        this.submit = () => {
            this.props.onSubmit();
            this.close();
        };
    }

    handleClose() {
        this.props.onClose();
        this.setState({
            open: false,
            message: this.props.message // Reset
        });
    }

    componentWillReceiveProps({message}) {
        if (this.props.message !== message) {
            this.setState({message});
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    fullWidth
                    open={this.state.open}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='alert-dialog-title'>{this.props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            {this.props.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {!this.props.cannotSubmit && <Button disabled={this.props.cannotSubmit} onClick={this.submit}>{this.props.submitLabel || 'Yes'}</Button>}
                        <Button color='primary' onClick={this.close}>
                            {this.props.cancelLabel || 'No'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

DialogExampleModal.propTypes = {
    cannotSubmit: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    submitLabel: PropTypes.string,
    cancelLabel: PropTypes.string
};

DialogExampleModal.defaultProps = {
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    onSubmit: () => {},
    onClose: () => {},
    message: ''
};
