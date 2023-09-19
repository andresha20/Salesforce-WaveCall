import { createElement } from 'lwc';
import TechnicianTile from 'c/technicianTile';

describe('c-technician-tile', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('calculates isActive correctly', () => {
        const element = createElement('c-technicianTile', {
            is: TechnicianTile
        });
        element.technician = { Id: '00202' };
        element.activeContact = '00202';
        document.body.appendChild(element);
        expect(element.isActive).toBe(true);
        element.activeContact = '456';
        expect(element.isActive).toBe(false);
    });

    it('fires selectcontact event when handleOpenRecordClick is called', () => {
        const element = createElement('c-technicianTile', {
            is: TechnicianTile
        });
        element.technician = { Id: '00202' };
        element.activeContact = '456';
        document.body.appendChild(element);
        const selectContactHandler = jest.fn();
        element.addEventListener('selectcontact', selectContactHandler);
        element.handleOpenRecordClick();
        expect(selectContactHandler).toHaveBeenCalledWith(
            expect.objectContaining({ detail: '00202' })
        );
    });
});