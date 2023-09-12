public class DynamicShedulerTechsController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAvailableTechnicians(String scheduleDay, String scheduleTime) {
        List<Contact> technicians = [SELECT Id, Schedule_Days__c, Title, AccountId, Phone, Email, Name FROM Contact WHERE (RecordType = 'Technician' AND Schedule_Days__c INCLUDES(:scheduleDay) AND Schedule_Availability__c INCLUDES(:scheduleTime))];
        return technicians;
    }
    
    @AuraEnabled(cacheable=true)
    public static void updateTechniciansAvailability(Id technicianId, String scheduleDay, String scheduleTime) {
        Contact targetTechnician = [SELECT Id, Schedule_Availability__c, Schedule_Days__c, Name FROM Contact WHERE Id = :technicianId];
        String techniciansScheduleTime = targetTechnician.Schedule_Availability__c;
        String techniciansScheduleDay = targetTechnician.Schedule_Days__c;
        Set<String> scheduleTimeSet = techniciansScheduleTime.split(';');
        Set<String> scheduleDaySet = techniciansScheduleDay.split(';');
        Set<String> updatedTimeSet = new Set<String>();
        Set<String> updatedDaySet = new Set<String>();
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
        String joinedScheduleTime = String.join(new List<String>(updatedTimeSet), ';');
        String joinedScheduleDay = String.join(new List<String>(updatedDaySet), ';');
        targetTechnician.Schedule_Availability__c = joinedScheduleTime;
        targetTechnician.Schedule_Days__c = joinedScheduleDay;
        INSERT targetTechnician;
    }
}