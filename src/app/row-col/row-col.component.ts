import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  } from '@angular/forms';

@Component({
  selector: 'app-row-col',
  templateUrl: './row-col.component.html',
  styleUrls: ['./row-col.component.scss']
})
export class RowColComponent implements OnInit {
  public rowcolForm!: FormGroup;
  public plotLayout: any;
  public plotForm!: FormGroup;

  constructor(private fb: FormBuilder,) {}
  ngOnInit(): void {
    this.rowcolForm = this.fb.group({
      numRows:[''],
      numCols:[''],
    })

    this.plotForm = this.fb.group({
      plot: this.fb.array([])
    });
  }

  generateLayout() {
    
    const numRows = this.rowcolForm.controls['numRows'].value;
    const numCols = this.rowcolForm.controls['numCols'].value;
    this.plotLayout = Array(numRows).fill(Array(numCols).fill(''));
    this.plotForm = this.fb.group({});
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        this.plotForm.addControl(`${i}-${j}`, this.fb.control(''));
      }
    }
  }

  houseRecommend() {
    const values = this.plotForm.getRawValue();
    const houses = [];
    const gyms = [];
    const restaurants = [];
    const hospitals = [];
  
    // Collect the positions of all houses, gyms, restaurants, and hospitals
    for (let i = 0; i < this.plotLayout.length; i++) {
      for (let j = 0; j < this.plotLayout[i].length; j++) {
        if (values[`${i}-${j}`].includes('House')) {
          houses.push([i, j]);
        }
        if (values[`${i}-${j}`].includes('Gym')) {
          gyms.push([i, j]);
        }
        if (values[`${i}-${j}`].includes('Restaurant')) {
          restaurants.push([i, j]);
        }
        if (values[`${i}-${j}`].includes('Hospital')) {
          hospitals.push([i, j]);
        }
      }
    }
  
    let minDistance = Number.MAX_VALUE;
    let minHouse = '';
  
    // Calculate the total distance from each house to the nearest gym, restaurant, and hospital
    for (const house of houses) {
      let minGymDistance = Number.MAX_VALUE;
      let minRestaurantDistance = Number.MAX_VALUE;
      let minHospitalDistance = Number.MAX_VALUE;
  
      for (const gym of gyms) {
        const distance = Math.abs(house[0] - gym[0]) + Math.abs(house[1] - gym[1]);
        if (distance < minGymDistance) {
          minGymDistance = distance;
        }
      }
  
      for (const restaurant of restaurants) {
        const distance = Math.abs(house[0] - restaurant[0]) + Math.abs(house[1] - restaurant[1]);
        if (distance < minRestaurantDistance) {
          minRestaurantDistance = distance;
        }
      }
  
      for (const hospital of hospitals) {
        const distance = Math.abs(house[0] - hospital[0]) + Math.abs(house[1] - hospital[1]);
        if (distance < minHospitalDistance) {
          minHospitalDistance = distance;
        }
      }
  
      const totalDistance = minGymDistance + minRestaurantDistance + minHospitalDistance;
      if (totalDistance < minDistance) {
        minDistance = totalDistance;
        minHouse = `Row ${house[0] + 1}, Col ${house[1] + 1}`;
      }
    }
  
    alert(`The Recommended House is in ${minHouse}.`);
  }
}

