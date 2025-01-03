import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/todo", { withCredentials: true });
        if (res.data.success) {
          setTodos(res.data.todos);
        } else {
          toast({
            title: 'Failed to fetch todos',
            description: 'No todos found or an error occurred.',
            status: 'error'
          });
        }
      } catch (err) {
        console.log(err);
        toast({
          title: 'Error',
          description: 'An error occurred while fetching todos.',
          status: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      if (res.data.success) {
        toast({
          title: 'Todo Created',
          description: res.data.message || 'Todo was created successfully.',
          status: 'success',
        });
        setTitle("");  
        setDescription(""); 
        setTodos(prevTodos => [...prevTodos, res.data.todo]);  // Add the new todo to the list
      } else {
        toast({
          title: 'Unexpected Error',
          description: 'Something went wrong.',
          status: 'error',
        });
      }
    } catch (error) {
      toast({
        title: 'Failed to Add Todo',
        description: error.response?.data?.message || 'An error occurred while adding the todo.',
        status: 'error',
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-10">
        <div className="flex items-center gap-5">
          <Input
            className="w-1/4"
            type="text"
            placeholder="Add a new todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={addTodoHandler}>Add Todo</Button>
        </div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-1/4 mt-3"
          placeholder="Add a description..."
        />

        <div className="mt-5 grid grid-cols-4 gap-3 items">
          {loading ? (
            <p className="text-white">Loading todos...</p>
          ) : todos.length === 0 ? (
            <p className="text-white">No todos available</p>
          ) : (
            todos.map((todoItem) => (
              <Card key={todoItem._id}>
                <CardContent>
                 <CardTitle> <h1 className='pt-4'>{todoItem.title}</h1></CardTitle>
                  <CardDescription><p>{todoItem.description}</p></CardDescription>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
