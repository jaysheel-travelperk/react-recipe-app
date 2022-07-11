import axios from "axios";
import React from "react";
import "@testing-library/jest-dom";
import RecipeList from "./RecipeList";
import {screen} from '@testing-library/dom'
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, act } from "@testing-library/react";


afterEach(cleanup);

jest.mock('axios')
describe('RecipeList', () => {
    it("List all the recipes", async () => {
        const recipes = [
            {"id":20,"name":"test-recipe-1","description":"This is a test recipe - 1",
            "ingredients":[{"name":"ingredient - 5"}]},
            {"id":19,"name":"test-recipe-2","description":"This is a test recipe - 2",
            "ingredients":[{"name":"ingredient - 23"},{"name":"ingredient - 37"}]}
        ]

        axios.get.mockResolvedValue({"data":recipes});
        await act(() => render(
            <MemoryRouter>
                <RecipeList />
            </MemoryRouter>
        ));
        expect(axios.get).toHaveBeenCalled();
        expect(screen.getByText("test-recipe-1")).toBeInTheDocument();
        expect(screen.getByText("This is a test recipe - 1")).toBeInTheDocument();
        
        expect(screen.getByText("test-recipe-2")).toBeInTheDocument();
        expect(screen.getByText("This is a test recipe - 2")).toBeInTheDocument();

        // Note ingredients are not displayed in the recipes page
    })
})