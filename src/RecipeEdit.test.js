import axios from "axios";
import React from "react";
import "@testing-library/jest-dom";
import RecipeEdit from "./RecipeEdit";
import {screen} from '@testing-library/dom'
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, act } from "@testing-library/react";

afterEach(cleanup);

jest.mock('axios')
describe('RecipeList', () => {
    it("Edit Recipe without state", async () => {
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
        await act(() => render(
            <MemoryRouter>
                <RecipeEdit />
            </MemoryRouter>
        ));

        expect(axios.get).toHaveBeenCalled();
        expect(screen.getByDisplayValue("test-recipe-47")).toBeInTheDocument();
        expect(screen.getByDisplayValue("This is a test recipe - 47")).toBeInTheDocument();
        expect(screen.getByDisplayValue("ingredient - 97")).toBeInTheDocument();
        expect(screen.getByDisplayValue("ingredient - 83")).toBeInTheDocument();
        expect(screen.getByDisplayValue("ingredient - 89")).toBeInTheDocument();
        expect(screen.getByDisplayValue("ingredient - 91")).toBeInTheDocument();
    })
})
