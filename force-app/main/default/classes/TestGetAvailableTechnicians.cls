@isTest
public class TestGetAvailableTechnicians {

    @TestSetup
    static void setup() {
        Account testAccount = new Account(
        	Name='Test Account'
        );
        Contact testTechnician = new Contact(
            FirstName = 'Juan',
            LastName = 'Vargas',
            Title = 'Technician',
            AccountId = testAccount.Id,
            Phone = '123-456-7890',
            Email = 'juan.vargas@exampleemail29939203.com',
            Schedule_Days__c = 'Monday;Tuesday;Wednesday',
            Schedule_Availability__c = '09:00 to 11:00;11:00 to 13:00;13:00 to 15:00'
        );
        insert testAccount;
        insert testTechnician;
    }
    
    @isTest
    static void testAvailableTechnicians() {
        System.Test.startTest();
        List<Contact> result = DynamicShedulerTechsController.getAvailableTechnicians('Monday', '11:00 to 13:00');
        System.Test.stopTest();
        System.assertEquals(1, result.size(), 'Should be 1');
    }
}