@isTest
public class TestDynamicShedulerTechsController {

    @TestSetup
    static void setup() {
        Contact testTechnician = new Contact(
            FirstName = 'Natalia',
            LastName = 'Hurtado',
            Schedule_Availability__c = '09:00 to 11:00;11:00 to 13:00;13:00 to 15:00',
            Schedule_Days__c = 'Monday;Tuesday;Wednesday'
        );
        insert testTechnician;
    }
    
    @isTest
    static void testUpdateTechniciansAvailability() {
        List<Contact> result = DynamicShedulerTechsController.getAvailableTechnicians('Monday', '11:00 to 13:00');
        Contact testTechnician = result[0];                                                    
        System.Test.startTest();
        DynamicShedulerTechsController.updateTechniciansAvailability(
            testTechnician.Id, 'Monday', '13:00 to 15:00'
        );
        System.Test.stopTest();

        Contact updatedTechnician = [SELECT Schedule_Availability__c, Schedule_Days__c FROM Contact WHERE Id = :testTechnician.Id];

        System.assertNotEquals('13:00 to 15:00', updatedTechnician.Schedule_Availability__c, '13:00 to 15:00 should be removed from availability');
        System.assertNotEquals('Monday', updatedTechnician.Schedule_Days__c, 'Monday should be removed from schedule days');
        System.assertEquals('09:00 to 11:00;11:00 to 13:00', updatedTechnician.Schedule_Availability__c, 'Other times should remain');
        System.assertEquals('Tuesday;Wednesday', updatedTechnician.Schedule_Days__c, 'Other days should remain');
    }
}