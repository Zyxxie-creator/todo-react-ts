import React, { useState, ChangeEvent, FC, useEffect } from 'react';
import { Todo } from '../../types';
import {
    TextField,
    Button,
    List,
    ListItem,
    Checkbox,
    Typography,
    Container,
    Box,
} from '@mui/material';

const TodoList: FC = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    const [inputValue, setInputValue] = useState<string>('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (): void => {
        if (inputValue.trim()) {
            const newTodo: Todo = {
                id: Date.now(),
                text: inputValue,
                completed: false,
            };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setInputValue('');
        }
    };

    const toggleTodo = (id: number): void => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
    };

    const clearCompleted = (): void => {
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    };

    const filteredTodos =
        filter === 'all'
            ? todos
            : filter === 'active'
                ? todos.filter((todo) => !todo.completed)
                : todos.filter((todo) => todo.completed);

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                ToDo List
            </Typography>
            <TextField
                label="New Todo"
                variant="outlined"
                value={inputValue}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button onClick={addTodo} variant="contained" sx={{ mb: 2 }}>
                Add
            </Button>
            <List>
                {filteredTodos.map((todo) => (
                    <ListItem key={todo.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                        <Typography variant="body1" sx={{ textDecoration: todo.completed ? 'line-through' : 'none', flexGrow: 1, mx: 2 }}>
                            {todo.text}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {new Date(todo.id).toLocaleString()}
                        </Typography>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1">Total Tasks: {todos.length}</Typography>
                <Box>
                    <Button onClick={() => setFilter('all')}>All</Button>
                    <Button onClick={() => setFilter('active')}>Active</Button>
                    <Button onClick={() => setFilter('completed')}>Completed</Button>
                    <Button onClick={clearCompleted} color="error" sx={{ ml: 2 }}>Clear Completed</Button>
                </Box>
            </Box>
            <Typography variant="h6" gutterBottom>
                by zyxxie
            </Typography>
        </Container>
    );
};

export default TodoList;