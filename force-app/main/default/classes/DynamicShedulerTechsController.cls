public class DynamicShedulerTechsController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAvailableTechnicians(String scheduleDay, String scheduleTime) {
        List<Contact> technicians = [SELECT Id, Title, AccountId, Phone, Email, Name FROM Contact WHERE (Schedule_Days__c INCLUDES(:scheduleDay) AND Schedule_Availability__c INCLUDES(:scheduleTime))];
        return technicians;
    }
}