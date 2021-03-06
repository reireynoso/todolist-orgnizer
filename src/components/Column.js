import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid';
import {Droppable} from 'react-beautiful-dnd'
// import {v4 as uuidv4} from 'uuid'

import Task from '../components/Task'
// import {addNewTask} from '../actions/todosAction'
import {startAddNewTask} from '../actions/todosAction'

export default ({col}) => {
    const dispatch = useDispatch();
    const columns = useSelector(state => state.todosReducer.columns);

    const [task, setTask] = useState("")
    const useStyles = makeStyles(() => ({
        column: {
            minHeight: "260px",
            padding: "0.5rem"
        },
        input: {
            width: "100%",
            '&::after': {
                borderBottom: "2px solid #1c88bf"
            }
        }
    }));

    const classes = useStyles();

    const handleAddNewTask = (e) => {
        if(e.key === "Enter"){
            if(task){
                const newTask = {
                    // id: uuidv4(),
                    content: task
                }
                // console.log(`create`, task)
                // dispatch(addNewTask(newTask))
                dispatch(startAddNewTask(newTask, columns))
                setTask("")
            }
        }
    }

    const handleRender = () => {
        const reorder = Object.entries(columns[col].taskIds)
        reorder.sort((a,b) => a[1] - b[1])
        const reformatted = reorder.map((taskid,index) => {
            // console.log(taskid)
            return <Task col={col} key={taskid[0]} taskid={taskid[0]} index={index}/>
        })
        // const reformatted = Object.keys(columns[col].taskIds).map((taskid,index) => {
        //     return <Task col={col} key={taskid} taskid={taskid} index={index}/>
        // })

        return reformatted
    }
    // console.log(columns)
    // console.log(Object.keys(columns[col].taskIds))

    return (
        <Grid  item xs={8} sm={6} md={4}>
        <h2 className="category__title">{columns[col].title}</h2>
        <Droppable droppableId={col}>
            {
            provided => (    
                <Paper 
                innerRef={provided.innerRef} 
                {...provided.droppableProps} 
                className={classes.column}>        
                    {
                        columns[col].taskIds && handleRender()
                    }
                    {
                    provided.placeholder
                    }
                    {
                    col === "column-1" ? <Input 
                        value={task}
                        className={classes.input}
                        placeholder="New task. Press Enter"
                        onChange = {(e) => setTask(e.target.value)}
                        onKeyPress={handleAddNewTask}
                        /> : null
                    }
                </Paper>
            )
            }
            </Droppable>
        </Grid>
    )
}