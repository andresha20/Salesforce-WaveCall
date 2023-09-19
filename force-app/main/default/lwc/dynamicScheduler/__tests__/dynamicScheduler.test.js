import { createElement } from 'lwc';
import DynamicScheduler from 'c/dynamicScheduler';

describe('c-dynamic-scheduler', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('sets activeContact property when handleContactSelection is called', () => {
        const element = createElement('c-dynamicScheduler', {
            is: DynamicScheduler
        });
        document.body.appendChild(element);
        const sampleDetail = 'contactId';
        const mockEvent = new CustomEvent('selectcontact', { detail: sampleDetail });
        element.handleContactSelection(mockEvent);
        expect(element.activeContact).toBe(sampleDetail);
    });
});