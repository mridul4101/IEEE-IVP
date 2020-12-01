import React from 'react';
import { Form, Input, Button} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import ReactDragListView from 'react-drag-listview';
import { useDynamicList } from 'ahooks';
import { useMapState } from './MapState';

interface CardProps extends FormComponentProps {
  form: any;
  index: number;
  option: string[];
  name: string;
  handleRemove: any;
  // handleCopy : any;
}

const Card = (props: CardProps) => {
  const { list, getKey, push, remove, insert } = useDynamicList(props.option || ['']);

  return (
    <div
      
      className="bg-white rounded my-3 px-3 py-4  text-left "
    >
      {/* <Icon style={{ cursor: 'move', marginRight: 8 }} type="drag" /> */}
      Question
      <i
        className="fa fa-trash"
        style={{ marginLeft: 8, float: 'right', fontSize: '1.5em' }}
        onClick={props.handleRemove}
        aria-hidden="true"
      ></i>
      <i className="fa fa-clone" style={{ marginLeft: 8, float: 'right', fontSize: '1.5em' }}></i>

      <Form.Item>
        {
          props.form.getFieldDecorator(`params[${props.index}].question`, {
            initialValue: props.name,
          }) (<Input placeholder="Please enter group Question" />)
        }
      </Form.Item>

      <Form.Item label="Options : ">
        {
          list.map((ele, index) => (
            <div key={getKey(index)}>
              <input style={{ margin: '8px' }} type="radio" />
              {
                props.form.getFieldDecorator(`params[${props.index}].options[${getKey(index)}]`, {
                  initialValue: ele,
                }) (<Input style={{ width: '80%' }} placeholder="Please enter the option" />)
              }

              <i className="fa fa-minus-circle"
                style={{ marginLeft: 8 }}
                onClick={() => {
                  remove(index);
                }}
              />

              <i className="fa fa-plus-circle"
                style={{ marginLeft: 8 }}
                onClick={() => insert(index + 1, '')}
              />
            </div>
          ))
        }
      </Form.Item>

      <Button
        block
        type="dashed"
        onClick={() => {
          push(' ');
        }}
      >
        {' '}
        Add Options{' '}
      </Button>
    </div>
  );
};

interface ListItem {
  name: string;
  option: string[];
}

interface q2 {
  question: string;
  options: string[];
}

const init: ListItem = {
  name: ' ',
  option: [''],
};

export default Form.create()((props: FormComponentProps) => {
  // const [ result,setResult] = useState('');
  const { setMapState } = useMapState();
  const { list, push, getKey, sortForm, move, remove } = useDynamicList<ListItem>([
    {
      name: 'How are you feeing today ? ',
      option: ['Happy', 'Sad', 'Curious', 'Emotional'],
    },
  ]);

  return (
    <div>
      <ReactDragListView
        onDragEnd={(fromIndex: number, toIndex: number) => move(fromIndex, toIndex)}
        handleSelector={'i[aria-label="icon: drag"]'}
        nodeSelector={'div'}
      >
        {list.map((ele, index) => (
          <Card
            form={props.form}
            handleRemove={() => {
              remove(getKey(index));
            }}
            key={getKey(index)}
            option={ele.option}
            name={ele.name}
            index={getKey(index)}
          />
        ))}
      </ReactDragListView>
      <Button style={{ marginTop: 16 }} block type="dashed" onClick={() => push(init)}>
        + Add Question
      </Button>

      <div>
        <br />
        <br />
        <br/>
       

        <Button
          onClick={() => {
            const res = props.form.getFieldsValue().params;
            const sortedResult = sortForm(res);
            console.log(sortedResult);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // setResult(JSON.stringify(sortedResult, null, 2));
            setMapState({ type: 'setFeatureRef', payload: { question: sortedResult } });
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
});