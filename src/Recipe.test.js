import axios from "axios";
import React from "react";
import "@testing-library/jest-dom";
import Recipe from "./Recipe";
import {screen} from '@testing-library/dom'
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, act } from "@testing-library/react";

afterEach(cleanup);

jest.mock('axios')
describe('Recipe', () => {
    it("List the details about requested recipe", async () => {
        const recipeInfo = {
            "id":31,
            "name":"test-recipe-47",
            "description":"This is a test recipe - 47",
            "ingredients":[
                {"name":"ingredient - 97"},
                {"name":"ingredient - 91"},
                {"name":"ingredient - 89"},
                {"name":"ingredient - 83"}
            ]}

        axios.get.mockResolvedValue({"data": recipeInfo});
        const {container} = await act(() => render(
            <MemoryRouter>
                <Recipe />
            </MemoryRouter>
        ));

        expect(axios.get).toHaveBeenCalled();
        expect(container).toHaveTextContent(/31/); // id
        expect(container).toHaveTextContent(/test-recipe-47/);
        expect(container).toHaveTextContent(/This is a test recipe - 47/);
        expect(container).toHaveTextContent(/ingredient - 97/);
        expect(container).toHaveTextContent(/ingredient - 83/);
        expect(container).toHaveTextContent(/ingredient - 89/);
        expect(container).toHaveTextContent(/ingredient - 91/);
    })
})