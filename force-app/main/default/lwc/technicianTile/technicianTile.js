import { LightningElement, api } from 'lwc';

export default class TechnicianTile extends LightningElement {
    @api technician;
    _activeContact;
    isActiveContact = false;

    handleOpenRecordClick() {
        const selectEvent = new CustomEvent('selectcontact', {
            detail: this.technician.Id
        });
        this.dispatchEvent(selectEvent);
    }
    @api get activeContact() {
        if (this._activeContact == this.technician.Id) {
            this.isActiveContact = true;
        } else {
            this.isActiveContact = false;

        }
        return this._activeContact;
    };
    set activeContact(value) {
        this.setAttribute('activeContact', value);
        this._activeContact = value;
        this.handleValueChange(value);
    }
    handleValueChange(value) {
        console.log(value);
    }
}