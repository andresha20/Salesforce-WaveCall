import { LightningElement, api } from 'lwc';

export default class TechnicianTile extends LightningElement {
    @api technician;
    _activeContact;
    isActiveContact = false;

    @api get activeContact() {
        return this._activeContact;
    };
    set activeContact(value) {
        this.setAttribute('activeContact', value);
        this._activeContact = value;
        this.handleValueChange(value);
    }

    get isActive() {
        return this.technician.Id == this._activeContact;
    }

    handleOpenRecordClick(event) {
        const selectEvent = new CustomEvent('selectcontact', {
            detail: this.technician.Id
        });
        this._activeContact = this.technician.Id;
        this.dispatchEvent(selectEvent);
    }
    handleValueChange(value) {
        console.log('RAN', value);
    }
}