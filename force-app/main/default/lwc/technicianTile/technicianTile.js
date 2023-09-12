import { LightningElement, api } from 'lwc';

export default class TechnicianTile extends LightningElement {
    @api technician;
    _activeContact;
    isActiveContact = false;

    @api get activeContact() {
        return this._activeContact;
    };
    set activeContact(value) {
        console.log('RAN ACTIVE CONTACT', value)
        this.setAttribute('activeContact', value);
        this._activeContact = value;
        this.handleValueChange(value);
    }

    handleOpenRecordClick() {
        const selectEvent = new CustomEvent('selectcontact', {
            detail: this.technician.Id
        });
        this.isActiveContact = true;
        console.log(this.isActiveContact);
        this.dispatchEvent(selectEvent);
    }
    handleValueChange(value) {
        console.log('RAN', value);
    }
}