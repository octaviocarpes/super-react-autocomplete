import { FunctionalAutoComplete } from "./index";
import { render } from "@testing-library/react";

test('If component matches snapshot', () => {
    const component = render(<FunctionalAutoComplete />)
    expect(component).toMatchSnapshot()
})
