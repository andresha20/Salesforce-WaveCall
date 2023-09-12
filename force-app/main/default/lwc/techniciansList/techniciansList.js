import { LightningElement, api, wire } from 'lwc';
import getAvailableTechnicians from '@salesforce/apex/DynamicShedulerTechsController.getAvailableTechnicians';

export default class TechniciansList extends LightningElement {
    selectedDaysValue;
    selectedTimeValue;
    _handleContactSelection;
    _activeContact;

    @api get handleContactSelection() {
        return this._handleContactSelection;
    };
    /**
     * @param {any} value
     */
    set handleContactSelection(value) {
        this.setAttribute('handleContactSelection', value);
        this._handleContactSelection = value;
        this.handleValueChange(value);
    }
    @api get activeContact() {
        return this._activeContact;
    };
    set activeContact(value) {
        console.log('contact till here')
        this.setAttribute('activeContact', value);
        this._activeContact = value;
        this.handleValueChange(value);
    }
    @api get selectedDaysValueFromParent() {
        return this.selectedDaysValue;
    };
    set selectedDaysValueFromParent(value) {
        this.setAttribute('selectedDaysValueFromParent', value);
        this.selectedDaysValue = value;
        this.handleValueChange(value);
    }
    @api get selectedTimeValueFromParent() {
        return this.selectedTimeValue;
    };
    set selectedTimeValueFromParent(value) {
        this.setAttribute('selectedTimeValueFromParent', value);
        this.selectedTimeValue = value;
        this.handleValueChange(value);
    }

    @wire(getAvailableTechnicians, { scheduleDay: '$selectedDaysValue', scheduleTime: '$selectedTimeValue' }) technicians;
    handleValueChange(value) {
        console.log(value);
    }
}