import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

const ITEM_HEIGHT = 48;

class MenuMore extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            paddingRight: 10,
                            paddingLeft: 10,
                            maxHeight: ITEM_HEIGHT * 4.5,
                            //  width: 200,
                        },
                    }}
                >
                    {this.props.options.map(option => (
                        <MenuItem key={option.data.value} selected={option.data.value === this.props.selectedValue}
                                  onClick={
                                      () => {

                                          this.handleClose();

                                          option.onClick(option.data);
                                      }
                                  }>
                            {option.data.label}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

MenuMore.propTypes = {
    options: PropTypes.PropTypes.arrayOf(PropTypes.shape(
        {
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number,]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number,]),
        }
        )
    ),
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number,])
};
MenuMore.defaultProps = {
    options: [],
    selectedValue: '',
};
export default MenuMore;
