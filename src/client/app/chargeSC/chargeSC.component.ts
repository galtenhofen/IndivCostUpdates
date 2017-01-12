import { Component, OnInit } from '@angular/core';
//import { ChargeServiceSC } from './chargeSC.service';
import { HomeService } from '../home/home.service';
import {ChargeSCFilterPipe} from './chargeSC.pipe';
import {IUpdateSC} from './updateSC';
import {IChargeSC} from './chargeSC';
import {IResponseSC} from './responseSC';


/**
 * This class represents the lazy loaded ChargeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sub-charge',
  templateUrl: 'chargeSC.component.html',
  styleUrls: ['chargeSC.component.css'],
})
export class ChargeComponentSC implements OnInit {

  //newName: string = '';
  errorMessage: string;


    pageTitle: string = 'Individual Cost Updates';
   // errorMessage: string;
    httpStatus: string;
    batchId: string;
    providerId: string;
    dataFileGroupId: string;
    userName: string;
    caseNumber: string;
    jsxid: number;

    reviewedList: string[] = [];
    update: IUpdateSC;
    updateObjects: IUpdateSC[] = [];

    postUpdates: string;

    response: IResponseSC;
    charges: IChargeSC[] = [];

    confirmResponse:string = '';
    loading: boolean = false;
    override: boolean = false;
    attempt: boolean;
    updating: boolean = false;
    updatingError: boolean = false;
    
    levelGroupFilter: string;
    revCodeFilter: string;
    descriptionFilter: string;
    modifiedFilter: string;

  

  /**
   * Creates an instance of the ChargeComponent with the injected
   * Charge.
   *
   * @param {ChargeServiceSC} ChargeServiceSC - The injected Charge.
   */
  constructor(public _chargeService: HomeService) {this.loading = this._chargeService.loading;}

  /**
   * Get the charges OnInit
   */
  ngOnInit() {
console.log('IN onInIt   this.charges stringify: ' + JSON.stringify(this.charges));
this.revCodeFilter = "";
this.levelGroupFilter = "Implant";

this.callGetSubcodedChargeList();
  }



onClickrefreshSubcodedChargeList(): void{
             console.log('Refresh Subcoded Charges Button Pressed');
             this.callGetSubcodedChargeList();
  
            }

callGetSubcodedChargeList():void{
       console.log('Retrieving Subcoded Charges...');

          //  this.attempt= true;
            this.errorMessage = "";
          this.charges = [];

                this.loading = true;
                this.dataFileGroupId = "878";
                    this._chargeService.getSubcodedCharges(this.dataFileGroupId)
                    .subscribe(
                        response => this.charges = response.chargeList,
                        error => this.onRequestComplete("Get Subcoded Charges", error),
                        () => this.onRequestComplete("Get Subcoded Charges", "200"));

            console.log('Leaving onClickrefreshChargeList this.loading: ' + this.loading);
}            

  onRequestComplete(action:any, result:any){
            console.log('ENTERING onRequestComplete  Action Performed: ' + action + '  Result: ' + result);
                if(action == "Get Subcoded Charges"){
                    if(result == "200")
                        {
                            this.loading = this._chargeService.loading;
                           // this.canEnableButtons();
                        }
                     else{
                          setTimeout(() => 
                            {
                            console.log("ERROR BRO");
                            this.errorMessage = result;
                            this.loading = false;
                          //  this.showErrorDialog(action, result);
                             },
                            1000);
                     }   

                    }
                else if(action == "Submit Subcoded Charges"){
                    if(result == "200")
                        {
                            //this.updating = false;
                            console.log("SUCCESS");
                         //   this.reinitialize();
                        }
                    else{
  //Timeout to ensure errorDialog reappears                          
                            setTimeout(() => 
                            {
                                console.log("ERROR BRO");
                                this.errorMessage = result;
                               // this.showErrorDialog(action, result);
                                //this.updating = false;
                            },
                            1000);
                    }

                }

        console.log("Loading?: " + this.loading);
        console.log("Error?: " + this.errorMessage);
        //console.log("ChargeLength?: " + this.charges.length);
        console.log("Charges: " + JSON.stringify(this.charges));
        console.log('LEAVING onRequestComplete');
        }




       makeTableScroll() {
            var maxRows = 20;

            var table: any = (<HTMLInputElement>document.getElementById('chargesTable')).value;
            var wrapper: any = (<HTMLInputElement>document.getElementById('chargesTable')).parentNode;
            //var wrapper = table.parentNode;
            var rowsInTable = table.rows.length;
            var height = 0;
            if (rowsInTable > maxRows) {
                for (var i = 0; i < maxRows; i++) {
                    height += table.rows[i].clientHeight;
                }
                wrapper.style.height = height + "px";
            }
        }
        
        
        onToggleReviewed(jsxid:string, reviewed:boolean): void{
        console.log('Reviewed button clicked.  CDMItemKey: ' + jsxid + '  Reviewed? = ' + reviewed);
        console.log('Current ReviewedList: ' + this.reviewedList)
        //this.reviewedList = {"batchId": jsxid, "newVarCost": null, "updated": updated  };

//if the jsxid id exists, remove current value first


for(var i = 0; i <  this.reviewedList.length; i++) {
                if( this.reviewedList[i] == jsxid) {
                     this.reviewedList.splice(i, 1);
                    break;
                    }
        }


        if(reviewed == true){
        //then add it in if updated = true
        this.reviewedList.push(jsxid);
      
        }


        console.log('reviewedList: ' + this.reviewedList);
        console.log('charges length: ' + this.charges.length);



    }



    onUpdateVarCost(jsxid:string, revCode: string, varCost:number, chargeId: string): void{
        console.log('VarCost Updated.  jsxid: ' + jsxid + '  Current value = ' + varCost);
     if (varCost == null || varCost>=1){
       this.update = {"jsxid": jsxid, "revCode": revCode,  "newVarCost": varCost, "chargeId": chargeId  };

    //if this batchid is already in the updated array, need to delete it before adding new value
        if(varCost != null){
            
            for(var i = 0; i <  this.updateObjects.length; i++) {
                if( this.updateObjects[i].jsxid == jsxid) {
                     this.updateObjects.splice(i, 1);
                    break;
                    }
            }

        this.updateObjects.push(this.update);

        console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
        }
        else{

            for(var i = 0; i <  this.updateObjects.length; i++) {
                if( this.updateObjects[i].jsxid == jsxid) {
                     this.updateObjects.splice(i, 1);
                    break;
                    }
                }
               

          console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
          
        }

         //Trying to find the object in the array of charge objects to update newVarCost
                for(var i = 0; i <  this.charges.length; i++) {
                    if( this.charges[i].jsxid == jsxid) {
                         this.charges[i].newVarCost = varCost;
                        break;
                        }
                    }
        console.log('stringify updateObj: ' + JSON.stringify(this.charges));
        
        
        console.log('updateObjects length: ' + this.updateObjects.length);

        console.log('charges length: ' + this.charges.length);
       // this.canEnableButtons();    
        }
        else{
           // alert("Value must be a number greater or equal to one.");
            var targetCell = "updateVarCost"+jsxid;
            (<HTMLInputElement> document.getElementById(targetCell)).value = "";
           
        }
    }

    onClickSubmit(): void{
    /*console.log('IN onClickSubmit - Reports to send:' + JSON.stringify(this.reportList));
   
    if(confirm('Are you sure you want to submit the selected reports and close the Prelim Reports App?')){

                this._chargeService.postReportList(this.reportList)
                .subscribe(
                    data => this.postUpdates = JSON.stringify(data), 
                    error => this.errorMessage = <any>error);

                    }
                    */
    }


  /**
   * Pushes a new name onto the charges array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  /*
  addName(): boolean {
    // TODO: implement ChargeService.post
    this.charges.push(this.newName);
    this.newName = '';
    return false;
  }*/

}
