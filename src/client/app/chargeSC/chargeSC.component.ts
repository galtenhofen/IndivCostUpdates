import { Component, OnInit } from '@angular/core';
import { ChargeService } from './chargeSC.service';
import {IChargeSC} from './chargeSC';
import {IResponse} from './responseSC';
//import {IReport} from './reportSC';

/**
 * This class represents the lazy loaded ChargeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-charge',
  templateUrl: 'charge.component.html',
  styleUrls: ['charge.component.css'],
})
export class ChargeComponent implements OnInit {

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

    
    postUpdates: string;
   reportList: string[] = [];
    //reportObjects: string[] = [];
    /*
    newVarCostUpdates: IUpdate[] = [];
    updateObjects: IUpdate[] = [];
    update: IUpdate;

    outbound: IOutbound;
*/
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
  constructor(public _chargeService: ChargeService) {this.loading = this._chargeService.loading;}

  /**
   * Get the charges OnInit
   */
  ngOnInit() {
console.log('IN onInIt   this.charges: ' + this.charges);

console.log('IN onInIt   this.charges stringify: ' + JSON.stringify(this.charges));
     //this.loading=false;
    //    this.attempt=false;
    //    this.updating=false;
  }

  /**
   * Handle the ChargeService observable
   */
 /* getCharges() {
    this.ChargeService.getCharges()
      .subscribe(
        charges => this.charges = charges,
        error => this.errorMessage = <any>error
      );
  }*/


onClickrefreshChargeList(): void{

     console.log('Retrieving Charges...');

          //  this.attempt= true;
          //  this.disableButtons();
            this.errorMessage = "";
          //  this.updating = false;
          this.charges = [];
            
                if (this.dataFileGroupId && this.dataFileGroupId != null && this.dataFileGroupId!=""){
                
                this.loading = true;

                    this._chargeService.getCharges(this.dataFileGroupId)
                    .subscribe(
                        response => this.charges = response.chargeList,
                        //error => this.errorMessage = <any>error,
                        error => this.onRequestComplete("Get Charges", error),
                        () => this.onRequestComplete("Get Charges", "200"));
                }
                else{
                    alert('Please Enter a DataFileGroupId to in order to fetch files');
            
                }

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
        console.log("ChargeLength?: " + this.charges.length);
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

        onClickselectStandard(source:any){
            console.log('Select Standard Reports');
            this.reportList = [];
            this.reportList.push("326731","326732","326733","326736","326641","326642","326644","326645","326647","326648","326649","326650","326651","326652","326653","326654","326658","326659","326660","326661","326662","326667","326668","326669","326670","326671","326672","326673","326674","326675","326676","326677","326678","326679","326685","326686","326687","326496","326497","326498","326499","326500","326501","326739","326740","326741","326742","326744");
           
            console.log("Charges[0]: " + JSON.stringify(this.charges[0]));  
 

            var checkboxes = document.getElementsByTagName('input'); 
            for (var i = 0; i < checkboxes.length; i++)
            {
            if (checkboxes[i].type == 'checkbox'){
                if(this.charges[i]){
                    if(this.charges[i].standardReport ==="Y"){
                   
                    checkboxes[i].checked = true;
                    }
                    else{
                        checkboxes[i].checked = false;
                    }
                }
                
                }
            }
            
            console.log('Report List: ' + JSON.stringify(this.reportList));

        }

          onClickdeselectAll(source:any){
              console.log('DeSelect All');
            this.reportList = [];
            var checkboxes = document.getElementsByTagName('input');   
            for (var i = 0; i < checkboxes.length; i++)
            {
            if (checkboxes[i].type == 'checkbox')
            {
            checkboxes[i].checked = source.checked;
            }
            }

                console.log('Report List: ' + JSON.stringify(this.reportList));
        }

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

        onToggleUpdate(jsxid:any, checked:any): void{
        console.log('Retry button clicked.  Identifier: ' + jsxid + '  Current value = ' + checked);
        

        if(checked == true){
        this.reportList.push(jsxid);
        console.log('retryObj: ' + this.reportList);
        console.log('stringify retryObj: ' + JSON.stringify(this.reportList));
        }
        else{

            for(var i = 0; i <  this.reportList.length; i++) {
                if( this.reportList[i] == jsxid) {
                     this.reportList.splice(i, 1);
                    break;
                    }
        }
          
          console.log('Report List: ' + JSON.stringify(this.reportList));
        }

        //this.canEnableButtons();    
    }

    onClickSubmit(): void{
        console.log('IN onClickSubmit - Reports to send:' + JSON.stringify(this.reportList));
   
    if(confirm('Are you sure you want to submit the selected reports and close the Prelim Reports App?')){

                this._chargeService.postReportList(this.reportList)
                .subscribe(
                    data => this.postUpdates = JSON.stringify(data), 
                    error => this.errorMessage = <any>error);

                    }
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
