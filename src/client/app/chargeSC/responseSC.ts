import {IChargeSC} from './chargeSC';

export interface IResponseSC {
   jsxid: string
   providerId: string
   dataFileGroupId: string
   userName: string
   caseNumber: string
   chargeList: IChargeSC[]
        
}

