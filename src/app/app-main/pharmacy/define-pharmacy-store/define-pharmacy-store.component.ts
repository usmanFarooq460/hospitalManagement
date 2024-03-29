import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BaseActions } from "src/app/shared/shared-classes/base-actions";
import { PharmacyService } from "../pharmacy.service";

@Component({
  selector: "app-define-pharmacy-store",
  templateUrl: "./define-pharmacy-store.component.html",
  styleUrls: ["./define-pharmacy-store.component.scss"],
})
export class DefinePharmacyStoreComponent
  extends BaseActions
  implements OnInit
{
  formdata: any;
  updateId: any;
  alldrugTypesList = [];

  constructor(
    private service: PharmacyService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.initForm();
  }

  initForm() {
    this.formdata = this.formBuilder.group({
      storeName: [null, [Validators.required]],
      storeLocation: [null, [Validators.required]],
      storeDescription: [null],
    });
    this.getHistoryStoreName();
  }

  get form() {
    return this.formdata.controls;
  }

  ngOnInit(): void {
    this.getHistoryStoreName();
  }

  getById(data) {
    this.updateId = data._id;
    this.loaderOn_Save_Update = false;
    this.formdata.patchValue({
      storeName: data.storeName,
      storeLocation: data.storeLocation,
      storeDescription: data.storeDescription,
    });
  }

  getHistoryStoreName() {
    this.isLoading = true;
    this.service.getHistoryStoreName().subscribe(
      (resp) => {
        this.isLoading = false;
        console.log("all dtug type ", resp);
        this.alldrugTypesList = resp;
      },
      (err) => {
        this.isLoading = false;
        console.log("err "+err)
        this.errorPopup(err.message);
      }
    );
  }

  clear() {
    this.updateId = null;
    this.initForm();
  }

  handleSave_Update() {
    if (this.formdata.valid == false) {
      this.formdata.markAllAsTouched();
      console.log("not valid :", this.formdata.value);
      return;
    }
    this.updateId == null || this.updateId == undefined
      ? this.save()
      : this.update(this.updateId);
  }

  save() {
    console.log("form data in save method", this.formdata.value);
    this.loaderOn_Save_Update = true;
    this.service.SaveStoreName(this.formdata.value).subscribe(
      (resp) => {
        this.loaderOn_Save_Update = false;
        this.SuccessPopup("saved SuccesFully");
        this.clear();
      },
      (err) => {
        this.loaderOn_Save_Update = false;
        this.errorPopup(err.message);
        console.log("error in save :",err)
      }
    );
  }

  update(id) {
    this.loaderOn_Save_Update = true;
    this.service.UpdateStoreName(this.updateId, this.formdata.value).subscribe(
      (resp) => {
        this.loaderOn_Save_Update = false;
        this.SuccessPopup("Updated SuccesFully");
        this.clear();
      },
      (err) => {
        this.loaderOn_Save_Update = false;
        this.errorPopup(err.messaged);
      }
    );
  }

  deleteStoreName(id) {
    this.service.deleteStoreName(id).subscribe(
      (resp) => {
        this.SuccessPopup("Deleted SuccesFully");
        this.clear();
      },
      (err) => {
        this.errorPopup(err.message);
      }
    );
  }
}
