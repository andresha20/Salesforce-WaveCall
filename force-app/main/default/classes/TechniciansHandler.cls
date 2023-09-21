public class TechniciansHandler {
	@InvocableMethod(label = 'Update technicians availability')
    public static List<Contact> updateSchedule(List<Request> requestList) {
    List<Contact> contactsList = requestList[0].contactsList;
    List<Contact> updatedList = new List<Contact>();
    for (Contact targetTechnician : contactsList) {
        String techniciansScheduleTime = targetTechnician.Schedule_Availability__c;
        String techniciansScheduleDay = targetTechnician.Schedule_Days__c;
        List<String> scheduleTimeSet = techniciansScheduleTime.split(';');
        List<String> scheduleDaySet = techniciansScheduleDay.split(';');
        String workOrderDay = requestList[0].workOrderDay;
        String workOrderTime = requestList[0].workOrderTime;
        scheduleTimeSet.add(workOrderTime);
        scheduleDaySet.add(workOrderDay);
        String joinedScheduleTime = String.join(scheduleTimeSet, ';');
        String joinedScheduleDay = String.join(scheduleDaySet, ';');
        targetTechnician.Schedule_Availability__c = joinedScheduleTime;
        targetTechnician.Schedule_Days__c = joinedScheduleDay;
        updatedList.add(targetTechnician);
    }
    UPDATE updatedList;
    return updatedList;
	}

    public class Request {
        @InvocableVariable(required = true)
        public List<Contact> contactsList;
        
        @InvocableVariable(required = true)
        public String workOrderDay;
        
        @InvocableVariable(required = true)
        public String workOrderTime;
    }
}