import React from 'react';

const FormCard = (props) => {
    return (
        <div className="ui card" style={{width: props.width, margin: '0 auto'}}>
            <div className="content">{props.children}</div>
        </div>
    );
}

export default FormCard;