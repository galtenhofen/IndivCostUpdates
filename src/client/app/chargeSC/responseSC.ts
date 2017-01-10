import {IChargeSC} from './chargeSC';

export interface IResponse {
   jsxid: string
   providerId: string
   dataFileGroupId: string
   userName: string
   caseNumber: string
   chargeListSC: IChargeSC[]
        
}

