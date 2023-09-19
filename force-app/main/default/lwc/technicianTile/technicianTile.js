import { LightningElement, api } from 'lwc';

export default class TechnicianTile extends LightningElement {
    @api technician;
    _activeContact;

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

    handleOpenRecordClick() {
        const selectEvent = new CustomEvent('selectcontact', {
            detail: this.technician.Id
        });
        console.log('act from grand parent', this.activeTechnician);
        this._activeContact = this.technician.Id;
        this.dispatchEvent(selectEvent);
    }
    handleValueChange(value) {
        console.log('RAN', value);
    }
}