import { renderToString } from 'react-dom/server';
import helloStory from './Hello.fixture';
import { expect, test } from 'vitest'

test('render hello', () => {
  document.body.innerHTML = renderToString(helloStory);
  expect(document.body.innerHTML).toBe('<h1>Hello World!</h1>')
})