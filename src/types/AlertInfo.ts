interface AlertInfo {
    EventID: number;
    EventCategoryID: number;
    EventCategoryName: string;
    EventCategoryDescription: string;
    LastModifiedDate: Date;
    IconName: string;
    EventPriorityID: number;
    HeadlineMessage: string;
    ExtendedMessage: string;
}

export default AlertInfo