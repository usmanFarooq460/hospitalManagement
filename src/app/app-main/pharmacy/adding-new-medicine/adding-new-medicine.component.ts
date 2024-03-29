import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BaseActions } from "src/app/shared/shared-classes/base-actions";
import { PharmacyService } from "../pharmacy.service";

@Component({
  selector: "app-adding-new-medicine",
  templateUrl: "./adding-new-medicine.component.html",
  styleUrls: ["./adding-new-medicine.component.scss"],
})
export class AddingNewMedicineComponent extends BaseActions implements OnInit {
  formData: any;
  drugTypeList = [];
  allDrugsHistoryList = [];
  updateId: any;
  searchValue: string;
  constructor(
    private formBuilder: FormBuilder,
    private service: PharmacyService
  ) {
    super();
    this.initForm();
  }

  ngOnInit(): void {
    this.getallDrugType();
    this.getHistory();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      drugName: [null, [Validators.required]],
      drugTypeId: [null, [Validators.required]], //Select box
      drugCode: [null, [Validators.required]],
      drugFormulae: [null, [Validators.required]],
      manufacturingDate: [null, [Validators.required]],
      expiryDate: [null, [Validators.required]],
      batchNo: [null, [Validators.required]],
      retailPrice: [null, [Validators.required]],
      ManufacturingPrice: [null],
      createdBy: [null],
      createdAt: [null],
      drugTypeName: [null],
    });
  }

  get form() {
    return this.formData.controls;
  }
  getById(data) {
    this.updateId = data._id;
    this.loaderOn_Save_Update = false;
    this.formData.patchValue({
      drugTypeId: data.drugTypeId,
      drugName: data.drugName,
      drugCode: data.drugCode,
      drugFormulae: data.drugFormulae,
      manufacturingDate: formatDate(data.manufacturingDate, "yyyy-MM-dd", "en"),
      expiryDate: formatDate(data.expiryDate, "yyyy-MM-dd", "en"),
      batchNo: data.batchNo,
      retailPrice: data.retailPrice,
      ManufacturingPrice: data.ManufacturingPrice,
      drugTypeName: data.drugTypeName,
      createdBy: data.createdBy,
      createdAt: data.createdAt,
    });

    window.scroll(0, 0);
  }

  getHistory() {
    this.isLoading = true;
    this.service.getAllDrugsHistory().subscribe(
      (resp) => {
        this.allDrugsHistoryList = resp;
        console.log("history of al drug list : ", resp, "new Date", new Date());
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.errorPopup("err in getting all medicine" + err.message);
      }
    );
  }

  getallDrugType() {
    this.service.getallDrugTpyes().subscribe(
      (resp) => {
        this.drugTypeList = resp;
      },
      (err) => {
        this.errorPopup(err.message);
      }
    );
  }

  HandleSearchChange(value) {
    this.searchValue = value;
  }

  handleSave_Update() {
    if (this.formData.valid == false) {
      this.formData.markAllAsTouched();
      return;
    }
    this.formData.value.drugTypeName = this.drugTypeList.find(
      ({ _id }) => _id == this.formData.value.drugTypeId
    )?.drugType;
    this.formData.value.createdBy = localStorage.getItem("UserName");
    this.formData.value.createdAt = new Date();
    if (
      this.formData.value.drugTypeName == null ||
      this.formData.value.drugTypeName == undefined
    ) {
      this.WarningPopup("Drug Type Id is Not valid");
      return;
    }

    if (this.updateId == null || this.updateId == undefined) {
      this.save();
    } else {
      this.update(this.updateId);
    }
  }

  save() {
    this.service.saveNewDrugOrMedicine(this.formData.value).subscribe(
      (resp) => {
        this.SuccessPopup("Added Successfully");
        this.getHistory();
        this.clearForm();
      },
      (err) => {
        this.errorPopup(err.error.message);
      }
    );
  }

  update(updateId) {
    this.loaderOn_Save_Update = true;
    console.log(
      "form data form for Update: ",
      this.formData.value,
      "update Id: ",
      updateId
    );
    this.service.updateDrug(updateId, this.formData.value).subscribe(
      (resp) => {
        console.log("Saved");
        this.SuccessPopup("Record updated Successfully");
        this.loaderOn_Save_Update = false;
        this.clearForm();
      },
      (err) => {
        this.loaderOn_Save_Update = false;
        this.errorPopup(err.error.message);
        console.log("err", err);
        console.log("casual message: ", err.error.errors);
      }
    );
  }

  deleteFunc(Id) {
    console.log("Deleting!");
    this.service.deleteDrug(Id).subscribe(
      (resp) => {
        this.SuccessPopup("Medicine has Deleted SuccessFully");
        this.getHistory();
      },
      (err) => {
        this.errorPopup("err in deleting " + err);
      }
    );
  }

  clearForm() {
    this.updateId = null;
    this.initForm();
  }
}
