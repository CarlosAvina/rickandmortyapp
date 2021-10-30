import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../components/SearchBar';

test('should render input', () => {
  render(<SearchBar />);
  const input = screen.getByPlaceholderText(/search/i);
  expect(input).toBeInTheDocument();
});

test('should render button', () => {
  render(<SearchBar />);
  const button = screen.getByRole('button', { name: /search/i });
  expect(button).toBeInTheDocument();
});

test('should handle submit event on search button click', () => {
  const onSubmit = jest.fn((e) => e.preventDefault());
  render(<SearchBar onSubmit={onSubmit} />);
  userEvent.click(screen.getByRole('button'));
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

test('should handle submit event on enter', () => {
  const onSubmit = jest.fn((e) => e.preventDefault());
  render(<SearchBar onSubmit={onSubmit} />);
  userEvent.type(screen.getByRole('textbox'), '{enter}');
  expect(onSubmit).toHaveBeenCalledTimes(1);
});
