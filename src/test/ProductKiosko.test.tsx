import React from "react";
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import ProductKiosko from "../components/ProductKiosko"; // Importar el componente
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import handleAddProduct from '../app/kiosko/page';

test('renders content', () => {
    let category: Category = {
        id: '123',
        name: 'Taco'
    };
    let product: Product = {
        quantity: 2,
        id: '123',
        name: 'tacoTest',
        unitprice: 12,
        category: category,
        image: 'test-image'
    };

    const component = render(<ProductKiosko product={product} onAddProduct={handleAddProduct}/>);
    component.getByText('tacoTest')
});

test('clicking the button calls the event handler once', () => {
    let category: Category = {
        id: '123',
        name: 'Taco'
    };
    let product: Product = {
        quantity: 2,
        id: '123',
        name: 'tacoTest',
        unitprice: 12,
        category: category,
        image: 'test-image'
    }; 

    const mockHandler = jest.fn()

    const component = render(<ProductKiosko product={product} onAddProduct={mockHandler}/>);

    const button = component.getByText('Agregar');
    fireEvent.click(button);
    const button2 = component.getByText('Add');
    fireEvent.click(button2);

    expect(mockHandler.mock.calls).toHaveLength(1);

})