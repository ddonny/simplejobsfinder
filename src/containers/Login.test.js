import React from 'react';
import TestRenderer from 'react-test-renderer';
import {Login} from './Login';
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import {shallow} from 'enzyme'
const mockStore = configureStore([]);
window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};
describe('My Connected React-Redux Component', () => {
    beforeAll(() => {  
        
    });
    it('should render login', () => {
        let store = mockStore({
            auth: {
                error: null
            }
        });
        store.dispatch = jest.fn();
        let testRenderer = TestRenderer.create(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        let testInstance = testRenderer.root;
        const json = testRenderer.toJSON();
        expect(json).toMatchSnapshot();
    });
});