import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ButtonOutline from "./ButtonOutline"
import theme from "../../assets/theme"

describe("Button Outline", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ButtonOutline theme={theme}>Submit</ButtonOutline>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})