import React from 'react';
import { useMapState } from './MapState';
import { Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

type CardProps = {
  index: number;
  name: string;
  option: string[];
};

function Question(props: CardProps) {
  return (
    <div className="text-left bg-white my-3 p-4 rounded"
    >
      <h6>
        <span className="text-dark badge badge-pill badge-primary mr-2">Q : {props.index + 1}</span>
        {props.name}
      </h6>
      <Form.Group>
        {/* {props.option} */}
        {props.option.map((ele, i) => (
          <Form.Check
            className="ml-5 font-weight-lighter"
            type="radio"
            label={ele}
            name={props.name}
            value={i}
          />
        ))}
      </Form.Group>
    </div>
  );
}

export default function Preview({ Next }) {
  const { mapState } = useMapState();
  const { question } = mapState;
  return (
    <div>
      <div  className="text-left bg-white p-4 rounded">
        <h3 className="text-dark"> {mapState.Title} </h3>
        <hr />
        <ReactMarkdown source={mapState.description} escapeHtml={false} />
      </div>

      {question.map((ele, index) => (
        <Question name={ele.question} index={index} option={ele.options} />
      ))}
    </div>
  );
}