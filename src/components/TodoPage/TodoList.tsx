"use client"
import React, { FC, useEffect, useState } from 'react'
import { getDoingList, getDoneList, getTodoList, TaskData } from '../TodoAPI'
import GroupDateList from './GroupDateList'

export interface GroupedData {
  [data: string]: TaskData[];
}

interface Props{
  status: string
}

const TodoList: FC<Props> = ({status}) => {
  const [todos, setTodos] = useState<TaskData[]>([])
  const [countScroll, setCountScroll] = useState<number>(0)
  const [loading, setLoading] = useState(false);


  const fetchTodos = async (status : string) => {
    let listData : TaskData[] = [];
    setLoading(true);
    switch (status) {
      case "todo":
        listData = await getTodoList()
        break;
      case "doing":
        listData = await getDoingList()
        break;
      case "done":
        listData = await getDoneList()
        break
      default:
        listData = []
        break;
    }
    setTodos(listData)
    setCountScroll(countScroll + 1);
    setLoading(false);
  }

  const fetchMoreTodos = async () => {
    let newTodos : TaskData[] = []
    setLoading(true);
    switch (status) {
      case "todo":
        newTodos = await getTodoList(countScroll)
        break;
      case "doing":
        newTodos = await getDoingList(countScroll)
        break;
      case "done":
        newTodos = await getDoneList(countScroll)
        break
      default:
        newTodos = []
        break;
    }
    setTodos([...todos, ...newTodos]);
    setCountScroll(countScroll + 1);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchTodos(status);
  }, []);

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[todos])

  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
  //   console.log('Fetch more list items!');
  // }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
  
    if (scrollTop + clientHeight >= scrollHeight){
      fetchMoreTodos()
      console.log('Fetch more list items!');
    }
  };

  const deleteTask = (id : string) =>{
    console.log(id);
    setTodos(todos.filter((item,index)=>{return item.id !== id}))
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-5xl font-bold py-5'>{status.toUpperCase()} List</h1>
      <GroupDateList tasks={todos} onDeleteTask={deleteTask}/>
      {loading && <div>Loading...</div> }
    </div>
  )
}

export default TodoList
