import React, { useState, useRef } from 'react';
import { Form, FormGroup } from 'react-bootstrap';
// import Ants from './Ants';
import 'antd/dist/antd.css';
import Questions from './Questions';
import { useMapState } from './MapState';

type State = {
  Title?: string;
  description?: string;
  time?: string;
  isPublic?: string;
};

function Design({ changeTab }) {

  const textRef = useRef<any>();
  const [state, setState] = useState<State>({
    Title: '',
    time: '',
    isPublic: 'false',
  });

  const { mapState, setMapState } = useMapState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setMapState({ type: 'setFeatureRef', payload: { [e.target.name]: e.target.value } });
  };
  
  const handleChange1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setMapState({ type: 'setFeatureRef', payload: { [e.target.name]: e.target.value } });
    textRef.current.style.height = '30px';
    textRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div>
      <h3 className=" text-white" >Design Your Own Survey </h3>
      {/* <button className='btn btn-primary' onClick={()=> changeTab}></button> */}
      <Form  className="text-left bg-white p-4 rounded">
        <Form.Group>
          <Form.Label> Title </Form.Label>
          <input
            className="form-control"
            type="name"
            placeholder="Enter title"
            name="Title"
            value={state.Title}
            onChange={handleChange}
          />
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label> Description </Form.Label>
          <textarea
            className="form-control "
            placeholder="Enter title"
            name="description"
            value={state.description}
            ref={textRef}
            onChange={handleChange1}
          />
        
          <Form.Text className="text-muted">
            For Style use{' '}
            <a href="https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf">MarkDown</a> or
            embed code
          </Form.Text>
        </Form.Group>
        <br/>
        <Form.Group>
        
          <Form.Label>Last Date & Time</Form.Label>
          <input
            className="form-control"
            type="datetime-local"
            name="time"
            value={state.time}
            onChange={handleChange}
            placeholder="Finised Time"
          />
        </Form.Group>
        <br/>
        <FormGroup className="mb-3">
          <Form.Label>Survey Type : </Form.Label>
          <br/> 
          <Form.Check
            type="radio"
            className="pt-1 pl-2"
            inline
            name="isPublic"
            label={`Public`}
            onChange={handleChange}
            value="true"
            style={{marginLeft:"12px"}}
          />
          <Form.Check
            type="radio"
            className="pt-1 pl-2"
            inline
            name="isPublic"
            label={`Private`}
            value="false"
            onChange={handleChange}
            style={{marginLeft:"5px"}}
          />
        </FormGroup>
        <hr />

        <Form.Group></Form.Group>
      </Form>
      <br />

      <Questions />
    </div>
  );
}

export default Design;