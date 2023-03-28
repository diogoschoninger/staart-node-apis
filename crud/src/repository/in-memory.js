import NotFoundError from '../utils/errors.js'
import wait from '../utils/wait.js'

const InMemoryUsersRepository = () => {
  let idSequence = 1
  const users = {}

  const insert = async user => {
    await wait(500)

    const id = idSequence++
    const data = { ...user, id }
    users[id] = data
    return data
  }

  const list = async () => {
    await wait(500)

    return Object.values(users)
  }

  const get = async id => {
    await wait(500)

    return users[id] ?? Promise.reject(new NotFoundError({ resourceName: 'user', resourceIdentifier: id }))
  }

  const update = async user => {
    await wait(500)

    users[user.id] = user
    return user
  }

  const del = async id => {
    await wait(500)

    return delete users[id]
  }

  return {
    insert,
    list,
    get,
    update,
    del,
  }
}

export default InMemoryUsersRepository
