import { createElement } from 'lwc';
import TechniciansList from 'c/techniciansList';

describe('c-technicians-list', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('fires selectcontact event when handleGrandChild is called', () => {
        const element = createElement('c-techniciansList', {
            is: TechniciansList
        });
        document.body.appendChild(element);
        const selectContactHandler = jest.fn();
        element.addEventListener('selectcontact', selectContactHandler);
        element.handleGrandChild({ detail: 'randomValue' });
        expect(selectContactHandler).toHaveBeenCalledWith(
            expect.objectContaining({ detail: 'randomValue' })
        );
    });

    it('sets and gets activeContact property correctly', () => {
        const element = createElement('c-techniciansList', {
            is: TechniciansList
        });
        element.activeContact = '321';
        expect(element.activeContact).toBe('321');
        element.activeContact = '23232333232';
        expect(element.activeContact).toBe('23232333232');
    });
});