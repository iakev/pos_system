import PropTypes from 'prop-types';
import React, { Component } from 'react';
import mainStyle from './style.css';
import SvgSearchIcon from '@mui/icons-material/Search';
import classnames from 'classnames';

export class AdvancedSearchButton extends Component {
    render() {
        return (
            <div>
                <button className={classnames(mainStyle.defaultButton)} onClick={this.props.onClick}>
                    <span className={mainStyle.iconWrap}>
                        <SvgSearchIcon color='action' style={{display: 'flex', height: '20px'}} />
                    </span> Advanced Search </button>
            </div>

        );
    }
}

AdvancedSearchButton.propTypes = {onClick: PropTypes.func.isRequired};

AdvancedSearchButton.defaultProps = {
    show: false
};

export default AdvancedSearchButton;
