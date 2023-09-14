public class DynamicShedulerTechsController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAvailableTechnicians(String scheduleDay, String scheduleTime) {
        List<Contact> technicians = [SELECT Id, Title, AccountId, Phone, Email, Name FROM Contact WHERE (RecordTypeId = '0128b000001etN8AAI' AND Schedule_Days__c INCLUDES(:scheduleDay) AND Schedule_Availability__c INCLUDES(:scheduleTime))];
        return technicians;
    }

    @AuraEnabled
    public static void updateTechniciansAvailability(Id technicianId, String scheduleDay, String scheduleTime) {
        Contact targetTechnician = [SELECT Schedule_Availability__c, Schedule_Days__c FROM Contact WHERE Id = :technicianId];
        String techniciansScheduleTime = targetTechnician.Schedule_Availability__c;
        String techniciansScheduleDay = targetTechnician.Schedule_Days__c;
        List<String> scheduleTimeSet = techniciansScheduleTime.split(';');
        List<String> scheduleDaySet = techniciansScheduleDay.split(';');
        List<String> updatedTimeSet = new List<String>();
        List<String> updatedDaySet = new List<String>();
        for (String value : scheduleTimeSet) {
            if (value != scheduleTime) {
                updatedTimeSet.add(value);
            }
        }
        for (String value : scheduleDaySet) {
            if (value != scheduleDay) {
                updatedDaySet.add(value);
            }
        }
        String joinedScheduleTime = String.join(updatedTimeSet, ';');
        String joinedScheduleDay = String.join(updatedDaySet, ';');
        targetTechnician.Schedule_Availability__c = joinedScheduleTime;
        targetTechnician.Schedule_Days__c = joinedScheduleDay;
        UPDATE targetTechnician;
    }
}