import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../components/Button';

test('should render text button', () => {
  render(<Button>Click</Button>);
  expect(screen.getByRole('button').textContent).toMatchInlineSnapshot(`"Click"`);
});

test('should render children', () => {
  render(
    <Button>
      <h1>Click</h1>
    </Button>
  );
  expect(screen.getByRole('button').firstChild).toMatchInlineSnapshot(`
    <h1>
      Click
    </h1>
  `);
});

test.todo('should render styles');

test.todo('should render disabled styles');

test('should render trigger onclick event', () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick}>Click</Button>);
  userEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('should render not trigger onclick event if disabled', () => {
  const onClick = jest.fn();
  render(
    <Button disabled onClick={onClick}>
      Click
    </Button>
  );
  userEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(0);
});

test.todo('should receive extra props');
