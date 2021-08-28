import { ClassAutoComplete } from "./index";
import { render } from "@testing-library/react";

test('If component matches snapshot', () => {
    const component = render(<ClassAutoComplete />)
    expect(component).toMatchSnapshot()
})
