import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './TodoList.css';

export default class TodoList extends React.Component {
    state ={
        tasks: []
    }
    constructor(props){
        super(props);
        this.TASKS_KEY = 'hsbc::tasks';
    }
    componentDidMount(){
        this.setState({tasks: this.fetchTasks()});
    };

    fetchTasks = () => JSON.parse(window.localStorage.getItem(this.TASKS_KEY)) || [];
    
    addTask = () => {
        const newTask = this.descInput.value;
        console.log('Adding new task', newTask);
        const newTasks = [...this.state.tasks, newTask];
        this.save(newTasks);
        this.setState({tasks: newTasks});
    };
    
    save = tasks => {
        window.localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
    }

    render() {
        return (
            <div>
                <div>Todo list</div>
                {this.state.tasks.map ((t, i) => <div key={i}>{t}</div>)}
                <div className="todolist-task">
                    <div>Add TODO:</div>
                    <div className="todolist-task__desc">Description:</div>
                    <div><input ref={ref => this.descInput = ref} /></div>
                    <RaisedButton label="Add" primary onClick={this.addTask}/>
                </div>
            </div>
        );
    }
};