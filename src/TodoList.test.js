import React from 'react';
import { shallow } from 'enzyme';
import TodoList from './TodoList';

describe('TodoList', () => {

  const mockDate =  new Date();
  beforeEach(() => {
    global.localStorage.getItem = () => {
      return JSON.stringify([{
        desc: 'Desc',
        date: mockDate
      }]);
    }
  })

  it('should load tasks on init', () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state().tasks).toHaveLength(1);
  });

  it('should add task', () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state().tasks).toHaveLength(1);
    wrapper.setState({
      newTask : {
          desc: 'AA',
          date: mockDate
      }
    });
    wrapper.instance().onAddTask();
    expect(wrapper.state().tasks).toHaveLength(2);
  });

  it('should remove task', () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state().tasks).toHaveLength(1);
    wrapper.instance().onDelete({
      desc: 'Desc',
      date: mockDate
    })();
    expect(wrapper.state().tasks).toHaveLength(0);
  });
  
});
