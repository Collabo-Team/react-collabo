import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';

test('renders home page', () => {

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const collaboElement = screen.getByText(/create/i);
  expect(collaboElement).toBeInTheDocument();
});
