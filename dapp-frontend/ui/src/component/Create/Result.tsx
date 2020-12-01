import React, { useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useMapState } from './MapState';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import ipfs from '../ipfs';


export default function Result ({ address }) 
{
  const { mapState } = useMapState();
  const [isSubmit, setisSubmit] = useState<boolean>(false);
  // const [txn,setTxn] = useState({hash:' ',timestamp : 0});
  const [spin, setSpin] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [hash, setHash] = useState('loading...');
  const [byte, setByte] = useState('loading...');



  const loadIPFS = async () => {
    let asyncGenerator = await ipfs.add(JSON.stringify(mapState));
    console.log(asyncGenerator);
    return asyncGenerator.path;
    // await get(asyncGenerator.path);
    // console.log('done');
  };

  var str2bool = (value) => {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
    }
    return value;
  };

  function renderTimeStamp(datetime: string): number {
    const date = new Date(datetime);
    const timeStamp: number = date.getTime();
    return timeStamp / 1000;
  }

  const handleSubmit = async () => {
    setisSubmit(true);
    setSpin(true);
    const Hash = await loadIPFS();
    console.log(Hash); 
    if (window.wallet) 
    {
      try 
      {
        const sur = await window.surveyInstance
          .connect(window.wallet)
          .addSurvey(Hash,mapState.Title, renderTimeStamp(mapState.time), str2bool(mapState.isPublic));
        const receipt = await sur.wait();
        const parseLogs = receipt.logs.map((log) => window.surveyInstance.interface.parseLog(log));
        console.log(parseLogs[0].args[1]);
        setByte(parseLogs[0].args[1]);
        console.log('TXN Hash :', sur);
        setHash(sur.hash);
        setDone(true);
      } catch (e) {
        let add = await window.wallet.getAddress();
        var err="";
        if(e?.message?.includes("You Have Already Built A Survey With This Name"))
          err = "You Have Already Built A Survey With This Name";
        else
          err = e;
        Swal.fire({
          icon: 'error',
          title: 'Oops...', 
          text: `${err}`,
        });
        setisSubmit(false);
      }
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Connect to wallet!',
      });
    }
    setSpin(false);
  };

  const TxnDetails = ({ hash, byte }) => {
    return (
      <>
        <br />
        <i className="fa fa-check-circle" style={{ fontSize: '8em', color: '#54BE3D' }}></i>
        <p className="text-primary">
          {' '}
          Transaction Sussessful <br /> Your Survey has been created{' '}
        </p>
        <br /> <br /> <br />
        <table className="table">
          <tr>
            <td> Transaction Hash : </td>
            <td>
              <a href={'https://rinkeby.etherscan.io/tx/' + hash}>{hash} </a>{' '}
            </td>
          </tr>
          <tr>
            <td>TimeStamp</td>
            <td>{Date.now()}</td>
          </tr>
          <tr>
            <td>Your Survey </td>
            <td>
              <Link to={'/Surveys/' + byte}>{byte}</Link>
            </td>
          </tr>
          <hr />
        </table>
      </>
    );
  };

  return (
    <div>
      <br />
      <br />
      <Card>
        <Card.Body>
          {/* <Card.Title>Complete Building Your Survey</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Are You Sure ?</Card.Subtitle> */}
          {/* <Card.Text className="text-dark"> You are connected with address {address}</Card.Text> */}
          {isSubmit ? null : (
            <>
              <Card.Title>Complete Building Your Survey</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Are You Sure ?</Card.Subtitle>
              <Card.Link className="mr-5" href="./home">
                No
              </Card.Link>
              <Button variant="primary" onClick={handleSubmit}>
                Yes
              </Button>
            </>
          )}
          <br /> 
          <br />
          {
            spin ? (
              <>
                <div className="preloader" >
                <Spinner animation="border" variant="primary" />
                <Card.Text className="text-primary">Please wait ...</Card.Text>
                </div>
              </>
            ) : null
          }
          {
            done ? (
              <>
                <TxnDetails hash={hash} byte={byte} />
              </>
            ) : (
            <i className="fa fa-close-circle" style={{ fontSize: '8em', color: '#54BE3D' }}></i>
            )
          }
        </Card.Body>
      </Card>
    </div>
  );
}