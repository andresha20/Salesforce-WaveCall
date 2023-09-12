public class DynamicSchedulerController {
    public static Map<String, Object> getTechnicianAvailability(SObject technician) {
        Map<String, Object> data = new Map<String, Object>();
        List<SelectOption> picklistValuesList= new List<SelectOption>();
        Schema.sObjectType objType = technician.getSObjectType();
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe(); 
        Map<String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap(); 
        Schema.DescribeFieldResult picklist = fieldMap.get('Availability__c').getDescribe();
        List<Schema.PicklistEntry> picklistValues = picklist.getPicklistValues();
        for (Schema.PicklistEntry value : picklistValues) {
            picklistValuesList.add(new SelectOption(value.getLabel(), value.getValue()));
        }
        data.put('schedules', picklistValuesList);
        data.put('technician', technician);
        return data;
    }
    
    public static List<Contact> getAvailableTechnicians(String scheduleOption) {
        List<Contact> technicians = new List<Contact>();
        Contact technician = [SELECT Name FROM Contact WHERE Availability__c != 'Busy'];
        return technicians;
    }
    
    public static Boolean scheduleContainsOption(List<SelectOption> schedule, SelectOption option) {
        return schedule.contains(option);
    }
    
    public static void setTechnicianAvailability(Id recordId, String scheduleOption, Boolean removeOpt) {
        Contact technician = [SELECT Availability__c FROM Contact WHERE Id = :recordId];
        Map<String, Object> data = getTechnicianAvailability(technician);
        List<SelectOption> schedules = (List<SelectOption>) data.get('schedules');
        SelectOption newOpt = new SelectOption(scheduleOption, scheduleOption);
        if (!removeOpt && !scheduleContainsOption(schedules, newOpt)) {
            schedules.add(newOpt);
        } else if (removeOpt) {
            Integer index = 0;
            for (SelectOption value : schedules) {
                if (value.getValue() == scheduleOption) {
                    schedules.remove(index);
                }
                index += 1;
            }
        }
    }
}