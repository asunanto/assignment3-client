import renderer from 'react-test-renderer'
import React from 'react'
import Signin from './Signin';

describe('signin snapshot', () => {
  it('Should render as expected', () => {
      const tree = renderer.create(
        <Signin handleSignIn={()=> {}} loginError='login error'/>
      )
      expect(tree.toJSON()).toMatchSnapshot()
  })
})