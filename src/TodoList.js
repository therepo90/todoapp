import React from 'react';
import moment from 'moment';
import { reject, isEmpty } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { APP_ID } from './constants';
import './TodoList.css';

export default class TodoList extends React.Component {
    state ={
        tasks: [],
        newTask: {
            desc: '',
            date: null
        }
    }
    constructor(props){
        super(props);
        this.TASKS_KEY = 'todoapp::tasks';
    }
    componentDidMount(){
        this.setState({tasks: this.fetchTasks()});
    };

    fetchTasks = () => JSON.parse(window.localStorage.getItem(this.TASKS_KEY) || JSON.stringify([]));
    
    onAddTask = () => {
        const newTask = this.state.newTask;
        if(!newTask.desc || !newTask.date){
            return;
        }
        console.log('Adding new task', newTask);
        const newTasks = [...this.state.tasks, newTask];
        this.save(newTasks);
        this.setState({tasks: newTasks});
    };
    
    save = tasks => {
        window.localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
    }
    
    onDateChosen = (_, date) => {
        this.setState({
            newTask : {
                ...this.state.newTask,
                date
            }
        });
    }
    
    onTaskDescChange = event => {
        this.setState({
            newTask : {
                ...this.state.newTask,
                desc:event.target.value
            }
        });
    }

    onShare =  task => () => {
        window.FB.ui({
            app_id: APP_ID,
            method: 'feed',
            link: 'http://www.google.com', /* It should be a link to this task */
        });
    };

    onDelete =  task => () => {
        console.log('deleting', task);
        const tasks = reject(this.state.tasks, t => t.desc === task.desc && new Date(t.date).getTime() === new Date(task.date).getTime());
        this.save(tasks);
        this.setState({tasks});
    };

    render() {
        return (
            <div>
                {!isEmpty(this.state.tasks) && <h2>TODO list:</h2> }
                <div className="todolist-list">
                        {this.state.tasks.map ((task, i) => (
                            <div key={i} className="todolist-list__element">
                                <div>
                                    <RaisedButton label="X" secondary onClick={this.onDelete(task)} />
                                    <span className="todolist-list__title">{`${moment(task.date).format('MMM Do')} - ${task.desc}`} </span>
                                </div>                                
                                <div>
                                    <RaisedButton label="Share" primary onClick={this.onShare(task)} />
                                </div>
                            </div>
                        ))}
                </div>
                <div className="todolist-task-container">
                    <form className="todolist-task">
                        <h3>Add TODO:</h3>
                        <div className="todolist-task__desc"><TextField hintText="Description" value={this.state.newTask.desc} onChange={this.onTaskDescChange} /></div>
                        <div><DatePicker hintText="Pick date" container="inline" onChange={this.onDateChosen} className="todolist__input" /></div>
                        <RaisedButton label="Add" primary onClick={this.onAddTask}/>
                    </form>
                </div>
            </div>
        );
    }
};