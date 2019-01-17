import store from '../config/store'
import {setBookmarksAction} from '../config/actions'
import {api} from '../api/init'

const fetchBookmarks = () => {
  api.get('/bookmarks').then((res) => {
    store.dispatch(setBookmarksAction(res.data))
  }).catch((err) => {
    console.error('Could not fetch bookmarks', err)
  })
}

const removeBookmark = (id) => {
  api.delete(`/bookmarks/${id}`)
  const index = store.getState().bookmarks.findIndex(bookmark => bookmark._id === id)
  if (index >= 0) {
    const newBookmarks = [...store.getState().bookmarks]
    newBookmarks.splice(index, 1)
    store.dispatch(setBookmarksAction(newBookmarks))
  }

}

export {fetchBookmarks, removeBookmark}