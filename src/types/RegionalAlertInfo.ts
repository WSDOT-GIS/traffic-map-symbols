interface RegionalAlertInfo {
    EventID: number;
    EventCategoryID: number;
    EventCategoryName: string;
    EventCategoryDescription: string;
    LastModifiedDate: number;
    IconName: string;
    EventPriorityID: number;
    Road: string;
    HeadlineMessage: string;
    ExtendedMessage: string;
    LocationName: string;
    EventCategoryType: string;
    CountyID: number;
}

export default RegionalAlertInfo;