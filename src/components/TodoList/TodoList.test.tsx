import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './index';
import '@testing-library/jest-dom';

describe('TodoList Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders Todo List', () => {
        render(<TodoList />);

        const inputElement = screen.getByLabelText(/new todo/i);
        expect(inputElement).toBeInTheDocument();
        expect(screen.getByText(/add/i)).toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(<TodoList />);

        const inputElement = screen.getByLabelText(/new todo/i);
        const buttonElement = screen.getByText(/add/i);

        fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
        fireEvent.click(buttonElement);

        expect(screen.getByText(/test todo/i)).toBeInTheDocument();
    });

    test('toggles todo completion', () => {
        render(<TodoList />);

        const inputElement = screen.getByLabelText(/new todo/i);
        const buttonElement = screen.getByText(/add/i);

        fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
        fireEvent.click(buttonElement);

        const checkboxElement = screen.getByRole('checkbox');

        expect(checkboxElement).not.toBeChecked();

        fireEvent.click(checkboxElement);

        expect(checkboxElement).toBeChecked();
    });

    test('filters todos correctly', () => {
        render(<TodoList />);

        const inputElement = screen.getByLabelText(/new todo/i);
        const buttonElement = screen.getByText(/add/i);

        fireEvent.change(inputElement, { target: { value: 'Active Todo' } });
        fireEvent.click(buttonElement);

        fireEvent.change(inputElement, { target: { value: 'Completed Todo' } });
        fireEvent.click(buttonElement);

        const checkboxElements = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxElements[0]);

        fireEvent.click(screen.getByText(/active/i));

        expect(screen.queryByText(/completed todo/i)).not.toBeInTheDocument();
    });

    test('clears completed todos', () => {
        render(<TodoList />);

        const inputElement = screen.getByLabelText(/new todo/i);
        const buttonElement = screen.getByText(/add/i);

        fireEvent.change(inputElement, { target: { value: 'Active Todo' } });
        fireEvent.click(buttonElement);

        fireEvent.change(inputElement, { target: { value: 'Completed Todo' } });
        fireEvent.click(buttonElement);

        const checkboxElements = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxElements[0]);

        fireEvent.click(screen.getByRole('button', { name: /clear completed/i }));

        expect(screen.queryByText(/completed todo/i)).not.toBeInTheDocument();
    });

    test('displays total tasks count', () => {
        render(<TodoList />);

        const inputElement = screen.getByLabelText(/new todo/i);
        const buttonElement = screen.getByText(/add/i);

        fireEvent.change(inputElement, { target: { value: 'Task 1' } });
        fireEvent.click(buttonElement);

        fireEvent.change(inputElement, { target: { value: 'Task 2' } });
        fireEvent.click(buttonElement);

        expect(screen.getByText(/total tasks:/i)).toHaveTextContent('Total Tasks: 2');
    });
});