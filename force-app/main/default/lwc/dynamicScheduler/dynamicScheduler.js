import { LightningElement } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi'
import Schedule_Picker__c from '@salesforce/schema/Work_Order__c.Schedule_Picker__c'
import getAvailableTechnicians from '@salesforce/apex/DynamicShedulerTechsController.getAvailableTechnicians';

export default class DynamicScheduler extends LightningElement {
    picklistValues = [];
    selectedValue = '07:00 to 09:00';

    @wire(getPicklistValues, {
        recordTypeId: '0128b000001elmmAAA',
        fieldApiName: Schedule_Picker__c,
    })
    getPicklistValuesForField({ data, error }) {
        if (error) {
          console.error(error)
        } else if (data) {
          this.picklistValues = [...data.values]
        }
    }
    handleChange(event) {
        this.selectedValue = event.detail.value;
    }
}