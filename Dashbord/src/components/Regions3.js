
import React, { useState, useEffect ,useContext} from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import Swal from 'sweetalert2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SwitchOn from '../SVG/Switch_On_new2.svg';
import SwitchOff from '../SVG/Switch_Off_new2.svg';

import SwitchVisible from '../SVG/switchDefault_00 P&D.svg';
import SwitchOffVisible from '../SVG/Switch_off_10_10.svg';
import SwitchOnVisible from '../SVG/Switch_off_01_01.svg';
import Switch_00_visible from '../SVG/Switch_off_00_00.svg';
import Switch_11_visible from '../SVG/Switch_off_11_11.svg';

import DataList from './RegionAlartList'
import '../Styling/Regions.css';
import LastBookContext from './LastBookContext';
import { Regions3DataContext } from './Regions3DataContext';
  
function Regions3({ topicHtml }) {
    const { lastBookElement } = useContext(LastBookContext);


    // const { currentValue, setCurrentValue, voltageValue, setVoltageValue, frequency, setFrequency, power, setPower } = useContext(Regions3DataContext);
    const { currentRphase, setcurrentRphase,currentYphase, setcurrentYphase,currentBphase, setcurrentBphase,voltageRphase, setvoltageRphase,voltageYphase, setvoltageYphase,voltageBphase, setvoltageBphase, frequency, setFrequency, ApparentPower, setApparentPower, ReactivePower, setReactivePower } = useContext(Regions3DataContext);

    // const initialSwitchState = lastBookElement ? lastBookElement.fields.status :"01";
    // const [isSwitchedOn, setIsSwitchedOn] = useState(initialSwitchState);
    // console.log("initial :",initialSwitchState);

    const [isSwitchedOn, setIsSwitchedOn] = useState("off");
    const [isToggling, setIsToggling] = useState(false);
    


    //load last value of the button status
    // useEffect(() => {
    //     if (lastBookElement && lastBookElement.fields) {
    //         switch (lastBookElement.fields.status) {
    //             case 'on':
    //                 setIsSwitchedOn('01');
    //                 break;
    //             case 'off':
    //                 setIsSwitchedOn('10');
    //                 break;
    //             case 'Error! 11':
    //                 setIsSwitchedOn('11');
    //                 break;
    //             case 'Error! 00':
    //                 setIsSwitchedOn('00');
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // }, [lastBookElement]);

    useEffect(() => {
        if (lastBookElement && lastBookElement.fields) {
            console.log("lastvalue",lastBookElement.fields.value);
            switch (lastBookElement.fields.value) {
                case "1":
                    setIsSwitchedOn(1);
                    break;
                case "2":
                    setIsSwitchedOn(2);
                    break;
                case "0":
                    setIsSwitchedOn(0);
                    break;
                case "3":
                    setIsSwitchedOn(3);
                    break;
                default:
                    break;
            }
        }
    }, [lastBookElement]);
    
    useEffect(() => {
        const handleWheel = (event) => {
            if (event.ctrlKey === true) {
                event.preventDefault();
            }
        };
    
        window.addEventListener('wheel', handleWheel, { passive: false });
    
        return () => {
            window.removeEventListener('wheel', handleWheel, { passive: false });
        };
    }, []); 
    

    const handleToggle = async () => {
        const newStatus = isSwitchedOn === 1 ? 2 : 1;
        const confirmationMessage = newStatus === 2 
            ? "Are you sure you want to turn on?" 
            : "Are you sure you want to turn off?";
        
        const confirmationSuccess = newStatus === 2 
            ? "Switched On" 
            : "Switched Off";

        // const isConfirmed = window.confirm(confirmationMessage);
        // if (!isConfirmed) {
        //     return;
        // }
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: confirmationMessage,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#C70039',
            confirmButtonText: 'Yes, do it!',
        });
        if (result.isConfirmed) {
            Swal.fire({
              title: confirmationSuccess,
            //   text: "You {confirmationSuccess}.",
              icon: "success",
              confirmButtonColor: '#008000',
            });
          }    
        if (!result.isConfirmed) {
            return;
        }
    
        setIsToggling(true);

        try {
            const response = await fetch('http://localhost:8000/send/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus ,topic: topicHtml}),
            });
            const data = await response.json();
            if (data.status && data.status !== newStatus) {
                setIsSwitchedOn(data.status);
            }
        } catch (error) {
            // alert("Failed to toggle:", error);
            Swal.fire({
                title: "Failed to toggle",
              //   text: "You {confirmationSuccess}.",
                icon: "error",
                confirmButtonColor: '#008000',
              });
        } finally {
            setIsToggling(false);
        }
    };

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/simple_message/');

        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log(data.message);

            data.message.forEach(item => {
                console.log(item);

// const { currentRphase, setcurrentRphase,currentYphase, setcurrentYphase,currentBphase, setcurrentBphase,voltageRphase, setvoltageRphase,voltageYphase, setvoltageYphase,voltageBphase, setvoltageBphase, frequency, setFrequency, ApparentPower, setApparentPower, ReactivePower, setReactivePower } = useContext(Regions3DataContext);
                if (item.Type === 9 && item.Address === 1050) {
                    setcurrentRphase(item.Value);
                }
                if (item.Type === 9 && item.Address === 1051) {
                    setcurrentYphase(item.Value);
                }
                if (item.Type === 9 && item.Address === 1052) {
                    setcurrentBphase(item.Value);
                }

                if (item.Type === 9 && item.Address === 1053) {
                    setFrequency(item.Value);
                }

                if (item.Type === 9 && item.Address === 1054) {
                    setvoltageRphase(item.Value);
                }

                if (item.Type === 9 && item.Address === 1055) {
                    setvoltageYphase(item.Value);
                }

                if (item.Type === 9 && item.Address === 1056) {
                    setvoltageBphase(item.Value);
                }

                if (item.Type === 9 && item.Address === 1057) {
                    setApparentPower(item.Value);
                }
                if (item.Type === 9 && item.Address === 1058) {
                    setReactivePower(item.Value);
                }

                // Check if type is 46 and address is 5000
                if (item.Type === 46 && item.Address === 5000) {
                    setIsSwitchedOn(item.Value);
                    console.log("statis",item.Value);
                }
    
            });

            // console.log(data.message.CB_POS);
            console.log("Value",isSwitchedOn);

            // setIsSwitchedOn(data.message.CB_POS);
            // setCurrentValue(data.message.CURRENT);
            // setVoltageValue(data.message.VOLTAGE);
            // setFrequency(data.message.FREQ);
            // setPower(data.message.POW);
        };

        socket.onopen = function(event) {
            console.log("WebSocket opened:", event);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
      <div>
        <div>  
            <div>
                <img src={SwitchVisible} alt="Switch visible" style={{width:'100%',marginBottom:'-75px'}}/>
                <div>
                    {isSwitchedOn === 2 ? (
                        <img src={SwitchOnVisible } alt="Switch on SVG" className="switch_on" style={{width:'50%' ,marginTop:'-150px',marginLeft:'256px'}}/>
                    )
                    : isSwitchedOn === 1 ? (
                        <img src={SwitchOffVisible} alt="Switch off SVG" className="switch_off" style={{width:'50%' ,marginTop:'-150px',marginLeft:'256px'}}/>
                    )
                    : isSwitchedOn === 0 ? (
                        <img src={Switch_00_visible} alt="Switch 00 SVG" className="switch_00" style={{width:'50%' ,marginTop:'-150px',marginLeft:'256px'}}/>
                    ):(
                        <img src={Switch_11_visible} alt="Switch 11 SVG" className="switch_11" style={{width:'50%' ,marginTop:'-150px',marginLeft:'256px'}}/>
                    )
                }
                </div>
                
                <div onClick={handleToggle} style={{ 
                    marginLeft: '405px', 
                    marginTop: '-41px', 
                    opacity: 0, 
                    width: '200px', 
                    height: '100px', 
                    clip: 'rect(1px, 1px, 1px, 1px)', 
                    whiteSpace: 'nowrap',
                    fontSize: '25px'
                    }}>
                    <label style={{ cursor: 'pointer' }}>
                        {isSwitchedOn === "01" ? "Switch____is_____on" : "Switch____is____off"}
                    </label>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Regions3;
