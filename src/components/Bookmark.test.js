import renderer from 'react-test-renderer'
import Bookmark from './Bookmark'
import React from 'react';
import {shallow} from 'enzyme'
// describe('Bookmark snapshot', () => {
//   it('Should render as expected', () => {
//     const tree = renderer.create(
//       <Bookmark key='123' title='My Bookmark'
//       url='http://www.mybookmark.com' _id='123' remove={()=>{}} />
//     )
//     expect(tree.toJSON()).toMatchSnapshot()
//   })
// })

jest.mock('../services/BookmarkService')
let {removeBookmark} = require('../services/BookmarkService')

describe('Bookmark snapshot', () => {
    it('Should render as expected', () => {
        const tree = renderer.create(
            <Bookmark key='123' title='My Bookmark' url="http://www.mybookmark.com" _id="123" remove={() => { }} />
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })
})

describe('Bookmark Component', () => {
  it('Should calll remove with correct argument when the delete button is pressed',
  () => {
      const _id = "123"

      const removeSpy = jest.fn( (id) => {
          console.log('in removeSpy with id', id)
      })

      const wrapper = shallow( //renders top level component mount renders all child components
          <Bookmark _id={_id} title='My Fake bookmark'
          url='http://www.myfakebookmark.com' remove={removeSpy}/>
      )

      let btn = wrapper.find('button')
      expect(btn).toHaveLength(1)
      expect(btn.text()).toEqual('Delete')
      btn.prop('onClick')()
      expect(removeSpy).toBeCalledWith(_id)
  })
  it('should call removeBookmark in BookmarkService', () => {
      const _id = "123"
      const wrapper = shallow(
        <Bookmark _id={_id} title='My Fake bookmark'
        url='http://www.myfakebookmark.com' remove={removeBookmark}/>
      )

      let btn = wrapper.find('button')
      expect(btn).toHaveLength(1)
      expect(btn.text()).toEqual('Delete')
      btn.prop('onClick')()
  })
})
