import { Component, OnInit } from '@angular/core';
import {ChargeFilterPipe} from './charge.pipe';
import { HomeService } from '../home/home.service';
import {ICharge} from './charge';
import {IResponse} from './response';
import {IReport} from './report';

/**
 * This class represents the lazy loaded ChargeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'non-charge',
  templateUrl: 'charge.component.html',
  styleUrls: ['charge.component.css'],
})
export class ChargeComponent implements OnInit {

    levelGroupFilter: string;
    revCodeFilter: string;
    descriptionFilter: string;
    modifiedFilter: string;


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

    
    postUpdates: string;
  
    //updateObjects: IUpdate[] = [];
    //update: IUpdate;

    reviewedList: string[] = [];

    response: IResponse;
    charges: ICharge[] = [];

    confirmResponse:string = '';
    loading: boolean = false;
    override: boolean = false;
    attempt: boolean;
    updating: boolean = false;
    updatingError: boolean = false;

  

  /**
   * Creates an instance of the ChargeComponent with the injected
   * Charge.
   *
   * @param {ChargeService} ChargeService - The injected Charge.
   */
  constructor(public _chargeService: HomeService) {this.loading = this._chargeService.loading;}

  /**
   * Get the charges OnInit
   */
  ngOnInit() {
console.log('IN onInIt   this.charges stringify: ' + JSON.stringify(this.charges));
this.revCodeFilter = "";
this.levelGroupFilter = "Implant";
this.callGetChargeList();

  }



onClickrefreshChargeList(): void{
            console.log('Refresh button clicked.');
            this.callGetChargeList();
            }

callGetChargeList():void{

     console.log('Retrieving Charges...');

          //  this.attempt= true;
            this.errorMessage = "";
          this.charges = [];

                this.loading = true;
                this.dataFileGroupId = "878";
                    this._chargeService.getCharges(this.dataFileGroupId)
                    .subscribe(
                        response => this.charges = response.chargeList,
                        error => this.onRequestComplete("Get Charges", error),
                        () => this.onRequestComplete("Get Charges", "200"));

            console.log('Leaving onClickrefreshBatchList this.loading: ' + this.loading);


}            

  onRequestComplete(action:any, result:any){
            console.log('ENTERING onRequestComplete  Action Performed: ' + action + '  Result: ' + result);
                if(action == "Get Charges"){
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
                else if(action == "Submit Charges"){
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
/*
          onClickselectAll(source:any){
              console.log('Select All');
            this.reportList = [];
            this.reportList = [];
            var checkboxes = document.getElementsByTagName('input');   
            for (var i = 0; i < checkboxes.length; i++)
            {
            if (checkboxes[i].type == 'checkbox')
            {
            checkboxes[i].checked = !source.checked;
            }
            }

            
            for (var j = 0; j < this.charges.length; j++){
                this.reportList.push(this.charges[j].jsxid);
            }
            console.log('Report List: ' + JSON.stringify(this.reportList));
        }
*/



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
        //console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
        console.log('charges length: ' + this.charges.length);
/*
        if(updated== true){
        this.updateObjects.push(this.update);
        console.log('retryObj: ' + this.updateObjects);
        console.log('stringify retryObj: ' + JSON.stringify(this.updateObjects));
        }
        else{

            for(var i = 0; i <  this.updateObjects.length; i++) {
                if( this.updateObjects[i].batchId == jsxid) {
                     this.updateObjects.splice(i, 1);
                    break;
                    }
        }
          
          console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
        }*/


    }
/*
    onUpdateVarCost(jsxid:string, varCost:any): void{
        console.log('VarCost Updated.  BatchId: ' + jsxid + '  Current value = ' + varCost);
     if (varCost != null && varCost != "" && varCost>=1){
       this.update = {"batchId": jsxid, "newVarCost": varCost, updated: false  };

//if this batchid is already in the updated array, need to delete it before adding new value
        if(varCost != "" && varCost != null){
            
            for(var i = 0; i <  this.updateObjects.length; i++) {
                if( this.updateObjects[i].batchId == jsxid) {
                     this.updateObjects.splice(i, 1);
                    break;
                    }
            }

        this.updateObjects.push(this.update);

        console.log('retryObj: ' + this.updateObjects);
        console.log('stringify retryObj: ' + JSON.stringify(this.updateObjects));
        }
        else{

            for(var i = 0; i <  this.updateObjects.length; i++) {
                if( this.updateObjects[i].batchId == jsxid) {
                     this.updateObjects.splice(i, 1);
                    break;
                    }
        }
          
          console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
        }
        console.log('updateObjects length: ' + this.updateObjects.length);
        console.log('batchFiles length: ' + this.batchfiles.length); 
        }
        else{
            alert("Value must be a number greater or equal to one.");
            var targetCell = "updateVarCost"+jsxid;
            (<HTMLInputElement> document.getElementById(targetCell)).value = "";
           
        }
    }

*/


        onClickLevelGrouping(value:any): void{
        console.log('LevelGrouping Chosen:  Filter by: ' + value);
         
        }

    onClickSubmit(): void{
        console.log('IN onClickSubmit - Reports to send:' + JSON.stringify(this.reviewedList));
   /*
    if(confirm('Are you sure you want to submit the selected reports and close the Prelim Reports App?')){

                this._chargeService.postReportList(this.reportList)
                .subscribe(
                    data => this.postUpdates = JSON.stringify(data), 
                    error => this.errorMessage = <any>error);

                    }
                    */
    }

    


}
