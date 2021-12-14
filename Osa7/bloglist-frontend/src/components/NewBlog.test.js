import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './NewBlog'

test('CreateForm calls createBlog with right information', async () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateForm createBlog={createBlog}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of title' }
  })
  fireEvent.change(author, {
    target: { value: 'testing of author' }
  })
  fireEvent.change(url, {
    target: { value: 'testing of url' }
  })
  fireEvent.submit(form)

  //console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing of author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing of url')
})