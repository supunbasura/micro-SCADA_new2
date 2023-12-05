import React from 'react'
import SwitchVisible from '../SVG/switchDefault_0000.svg';
import SwitchOffVisible from '../SVG/Switch_off_10_10.svg';
function MyComponent() {
    return (
        <div>
            <p style={{color: 'red'}}>Testing to see if my component renders!</p>
            <img src={SwitchVisible} alt="Switch visible" style={{width:'100%'}}/>
            <img src={SwitchOffVisible} alt="Switch off SVG" style={{width:'100%' ,marginTop:'-300px'}}/>

        </div>
    )
}

export default MyComponent;