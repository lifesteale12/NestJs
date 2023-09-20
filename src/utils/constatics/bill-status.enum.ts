/**
 * สถานะบิล
 */
export enum BillStatus {
    /**
     *  ใหม่
     */
    NEW = 'new',
    /**
     *  รอดำเนินการ
     */
    PENDING = 'pending',
    /**
     *  แก้ไข
     */
    AMEND = 'amend',
    /**
     *  สำเร็จ
     */
    SUCCESS = 'success'
}