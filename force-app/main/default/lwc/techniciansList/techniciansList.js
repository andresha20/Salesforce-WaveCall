import { LightningElement, api, wire } from 'lwc';
import getAvailableTechnicians from '@salesforce/apex/DynamicShedulerTechsController.getAvailableTechnicians';

export default class TechniciansList extends LightningElement {
    selectedValue;
    @api get selectedValueFromParent() {
        return this.selectedValue;
    };
    set selectedValueFromParent(value) {
        this.setAttribute('selectedValueFromParent', value);
        this.selectedValue = value;
        this.handleValueChange(value);
    }

    @wire(getAvailableTechnicians, { schedule: '$selectedValue' }) technicians;
    handleValueChange(value) {
        console.log(value);
    }
}