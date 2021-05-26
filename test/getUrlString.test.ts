/**************************************************
 * Testing getUrlString as a standalone unit test *
 **************************************************/

import getUrlString from '../src/getUrlString';

const PATHNAME = '/user';

it('Should return proper url', () => {
  const states = {
    id: 1,
    name: 'Harold',
    occupation: 'teacher'
  };
  const urlString = getUrlString(states);
  expect(urlString).toBe(`${PATHNAME}?id=1&name=Harold&occupation=teacher`);
});

it('Should not return undefined value', () => {
  const states = {
    id: 1,
    name: undefined
  };
  const urlString = getUrlString(states);
  expect(urlString).toBe(`${PATHNAME}?id=1`);
});

it('Should return pathname only', () => {
  const emptyStates = {};

  expect(getUrlString(emptyStates)).toBe(PATHNAME);
  expect(getUrlString(new Date())).toBe(PATHNAME);
});
