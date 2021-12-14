import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title : 'Title and author rendering test',
    author : 'Testauthor',
    url : 'www.testing.com',
    likes : 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Title and author rendering test')
  expect(component.container).toHaveTextContent('Testauthor')
})

test('clicking the button shows all content of blog', async () => {
  const blog = {
    title : 'Title and author rendering test',
    author : 'Testauthor',
    url : 'www.testing.com',
    likes : 5,
    user: {
      username: 'Login',
      name: 'Log',
    },
  }

  const user = {
    username: 'Login',
    name: 'Log'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} Visibility={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('www.testing.com')
  expect(component.container).toHaveTextContent(5)
})

test('clicking the like button twice calls eventhandler twice', async () => {
  const blog = {
    title : 'Title and author rendering test',
    author : 'Testauthor',
    url : 'www.testing.com',
    likes : 5,
    user: {
      username: 'Login',
      name: 'Log',
    },
  }

  const user = {
    username: 'Login',
    name: 'Log'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateLikes={mockHandler} />
  )

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

