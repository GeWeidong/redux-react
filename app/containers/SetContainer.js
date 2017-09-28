import React from 'react';
import {connect} from 'react-redux';
import SetPage from '../pages/SetPage';

class SetContainer extends React.Component {
    render() {
        return (
            <SetPage {...this.props} />
        )
    }
}

export default connect((state) => {
    
    const { setReducer, userReducer } = state;
    return {
        setReducer,
        userReducer
    }

})(SetContainer);