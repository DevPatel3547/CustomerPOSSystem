import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { makeStore } from './store';

test('App renders inside the Redux provider', () => {
  const { container } = render(
    <Provider store={makeStore()}>
      <App />
    </Provider>,
  );
  expect(container.querySelector('.App')).not.toBeNull();
});
