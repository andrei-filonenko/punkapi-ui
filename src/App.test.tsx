import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders learn react link', () => {
  const rendered = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  debugger
  expect(rendered.getByText(/Find my beer/i)).toBeInTheDocument();
});
