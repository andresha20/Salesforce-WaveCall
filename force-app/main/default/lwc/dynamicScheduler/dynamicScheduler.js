import { LightningElement, wire, api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { CloseActionScreenEvent } from 'lightning/actions';
import Work_Order__c from '@salesforce/schema/Work_Order__c'
import Schedule_Picker__c from '@salesforce/schema/Work_Order__c.Schedule_Picker__c'
import Assistance_Type__c from '@salesforce/schema/Work_Order__c.Assistance_Type__c'
import Schedule_Days_Picker__c from '@salesforce/schema/Work_Order__c.Schedule_Days_Picker__c'
import updateTechniciansAvailability from '@salesforce/apex/DynamicShedulerTechsController.updateTechniciansAvailability';

export default class DynamicScheduler extends LightningElement {
    @api recordId;
    formFields = {};
    displayButton = false;
    assistanceTypeValues = [];
    daysPicklistValues = [];
    timePicklistValues = [];
    activeContact;
    selectedDayValue = 'Monday';
    selectedTimeValue = '07:00 to 09:00';

    @wire(getPicklistValues, {
      recordTypeId: '0128b000001elmmAAA',
      fieldApiName: Assistance_Type__c,
    })
    getAssistanceTypePicklistValuesForField({ data, error }) {
        if (error) {
          console.error(error)
        } else if (data) {
          this.assistanceTypeValues = [...data.values]
        }
    }
    @wire(getPicklistValues, {
        recordTypeId: '0128b000001elmmAAA',
        fieldApiName: Schedule_Days_Picker__c,
    })
    getDaysPicklistValuesForField({ data, error }) {
        if (error) {
          console.error(error)
        } else if (data) {
          this.daysPicklistValues = [...data.values]
        }
    }
    @wire(getPicklistValues, {
      recordTypeId: '0128b000001elmmAAA',
      fieldApiName: Schedule_Picker__c,
    })
    getTimePicklistValuesForField({ data, error }) {
      if (error) {
        console.error(error)
      } else if (data) {
        this.timePicklistValues = [...data.values]
      }
    }
    handleDaysChange(event) {
        this.selectedDayValue = event.detail.value;
    }
    handleTimeChange(event) {
        this.selectedTimeValue = event.detail.value;
    }
    changeHandler(event) {
      const { name, value } = event;
      this.formFields[name] = value;
    }
    createWorkOrder() {
      if (!activeContact) {
        return this.showToast('Invalid or empty contact', error.body.message, 'error');
      }
      this.formFields['Technician__c'] = this.activeContact;
      this.formFields['CreationDate'] = new Date().toISOString();
      const recordInput = { 
        apiName: Work_Order__c.objectApiName, 
        
        fields: this.formFields
      };
      createRecord(recordInput).then(result => {
        updateTechniciansAvailability({ 
          technicianId: this.activeContact, 
          scheduleDay: this.selectedDayValue, 
          scheduleTime: this.selectedTimeValue 
        }).then(result => {
          console.log(`Contact record with ID ${result.Id}.`)
        }).catch(error => {
          console.log(error);
          this.showToast('Error updating contact record', error.body.message, 'error');
        })
        this.showToast('success', `Work order created with ID ${result.id}`);
        this.template.querySelector('form.createForm').reset();
        this.formFields = {};
      }).catch(error => {
        console.log(error);
        this.showToast('Error creating record', error.body.message, 'error');
      })
    }
    showToast(title, message, variant) {
      this.dispatchEvent(new ShowToastEvent({ 
        title, 
        message, 
        variant
      }));
    }
    handleContactSelection(event) {
      this.activeContact = event.detail;
      this.displayButton = true;
    }
    closeAction() {
      this.dispatchEvent(new CloseActionScreenEvent());
    }
}