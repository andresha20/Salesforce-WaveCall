import { LightningElement, wire, api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord, updateRecord } from 'lightning/uiRecordApi';
import { CloseActionScreenEvent } from 'lightning/actions';
import Work_Order__c from '@salesforce/schema/Work_Order__c'
import Schedule_Picker__c from '@salesforce/schema/Work_Order__c.Schedule_Picker__c'
import Assistance_Type__c from '@salesforce/schema/Work_Order__c.Assistance_Type__c'
import Schedule_Days_Picker__c from '@salesforce/schema/Work_Order__c.Schedule_Days_Picker__c'
import updateTechniciansAvailability from '@salesforce/apex/DynamicShedulerTechsController.updateTechniciansAvailability';

export default class DynamicScheduler extends LightningElement {
    @api recordId;
    formFields = {};
    assistanceTypeValues = [];
    daysPicklistValues = [];
    timePicklistValues = [];
    _activeContact = null;
    selectedDayValue = 'Monday';
    selectedTimeValue = '07:00 to 09:00';

    @api get activeContact() {
      return this._activeContact;
    }
    set activeContact(value) {
      this._activeContact = value;
      this.handleValueChange(value);
    }
    handleValueChange(value) {
      console.log(value);
    }
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
      const { name, value } = event.target;
      this.formFields[name] = value;
    }
    createWorkOrder() {
      if (!this.activeContact) {
        return this.showToast('Invalid or empty contact', 'Select a technician from the list first.', 'error');
      }
      if (!this.formFields.Assistance_Type__c) {
        return this.showToast('Invalid assistance type', 'Select the type of assistance.', 'error');
      }
      this.formFields.Technician__c = this.activeContact;
      this.formFields.Creation_Date__c = new Date().toISOString();
      this.formFields.Schedule_Days_Picker__c = this.selectedDayValue;
      this.formFields.Schedule_Picker__c = this.selectedTimeValue;
      this.formFields.Case__c = this.recordId;
      const recordInput = { 
        apiName: Work_Order__c.objectApiName, 
        fields: this.formFields
      };
      // Create work order
      createRecord(recordInput).then(result => {
        // Update contact
        updateTechniciansAvailability({ 
          technicianId: this.activeContact, 
          scheduleDay: this.selectedDayValue, 
          scheduleTime: this.selectedTimeValue 
        }).then(availabilityResult => {
          console.log(`Contact record with ID ${availabilityResult.Id}.`)
        }).catch(error => {
          console.log(error);
          this.showToast('Error updating contact record', error.body.message, 'error');
        })
        updateRecord({
          fields: { Id: this.recordId, Status: 'Escalated' }
        }).then(updateResult => {
          console.log(`Case record's Status with ID ${updateResult.id} updated to Escalated.`)
        }).catch(error => {
          console.log(error);
          this.showToast('Error updating case record', error.body.message, 'error');
        })
        this.showToast('Success', `Work order created with ID ${result.id}`, 'success');
        this.template.querySelector('form.createForm').reset();
        this.formFields = {};
        this.closeAction();
      }).catch(error => {
        console.log(error);
        this.showToast('Error creating record', error.body.message, 'error');
      })
      return false;
    }
    showToast(title, message, variant) {
      this.dispatchEvent(new ShowToastEvent({ 
        title, 
        message, 
        variant
      }));
    }
    handleContactSelection(event) {
      this._activeContact = event.detail;
    }
    closeAction() {
      this.dispatchEvent(new CloseActionScreenEvent());
    }
}