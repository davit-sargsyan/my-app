import React, { PureComponent } from 'react';

class Header extends PureComponent {
    render(){
        return(
            <h1 className='center'>{this.props.title}</h1>
        )
    }
}

export default Header